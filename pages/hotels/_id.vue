<template>
  <div class="container" :class="{ loader: fetchLoading }">
    <div v-if="hotel" class="hotel-page">
      <div class="hotel-header" id="overview">
        <div class="hotel-images">
          <div class="feature-image">
            <img
              :src="$global.imgBasePath + hotel.featured_image"
              alt="Feature Image"
            />
          </div>
          <div class="other-images">
            <img
              v-for="i in 4"
              :key="i"
              :src="$global.imgBasePath + hotel.images[i].name"
              alt="Image"
            />
            <button
              v-if="hotel.images.length > 4"
              class="more-images-btn"
              @click="showModal = true"
            >
              <i class="fa-regular fa-images"></i> {{ hotel.images.length - 4 }}
              <i class="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="hotel-navigation">
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#rooms">Rooms</a></li>
        </ul>
      </div>
      <div class="hotel-details">
        <div class="hotel-info">
          <h1>{{ hotel.name }}</h1>
          <p>{{ hotel.short_description }}</p>
          <div class="rating">
            <div class="rate fit-width">
              {{ hotel.rating }}
            </div>
          </div>
        </div>
        <div id="amenities" class="hotel-amenities">
          <h2>Popular amenities</h2>
          <ul>
            <li v-for="(amenity, index) in visibleAmenities" :key="index">
              <img
                :src="$global.imgBasePath + amenity.image"
                width="30"
                alt=""
              />
              {{ amenity.name }}
            </li>
          </ul>
          <a-button
            v-if="hotel.amenities.length > maxVisibleAmenities"
            type="link"
            class="amenities-see-more-bnt"
            @click="toggleAmenities"
          >
            {{ showMoreAmenities ? "See Less Amenities" : "See All Amenities" }}
          </a-button>
        </div>
        <div v-html="hotel.description"></div>
      </div>

      <div id="rooms" class="rooms-wrapper" v-if="hotel.rooms.length">
        <h1 style="text-align: center">Chose your Room</h1>
        <div class="rooms">
          <room-card
            v-for="(room, index) in hotel.rooms"
            :key="index"
            :details="room"
          />
        </div>
      </div>
      <a-modal
        v-model="showModal"
        title="Hotel Images"
        width="80rem"
        class="hotel-all-images-modal"
        :footer="null"
      >
        <a-carousel arrows class="image-slider">
          <div
            slot="prevArrow"
            class="custom-slick-arrow"
            style="left: 1rem; z-index: 1"
          >
            <a-icon type="left-circle" />
          </div>
          <div slot="nextArrow" class="custom-slick-arrow" style="right: 1rem">
            <a-icon type="right-circle" />
          </div>
          <div v-for="(img, index) in allImages" :key="index">
            <img
              :src="$global.imgBasePath + img.name"
              class="carousel-image"
              alt="Hotel Image"
            />
          </div>
        </a-carousel>
      </a-modal>
    </div>
  </div>
</template>
<script>
import RoomCard from "@/components/Hotel/RoomCard.vue";
export default {
  name: "HotelPage",
  components: {
    RoomCard,
  },
  computed: {
    allImages() {
      return [
        { id: 999999999, name: this.hotel.featured_image },
        ...this.hotel.images,
      ];
    },
    visibleAmenities() {
      return this.showMoreAmenities
        ? this.hotel.amenities
        : this.hotel.amenities.slice(0, this.maxVisibleAmenities);
    },
  },
  data() {
    return {
      fetchLoading: true,
      showModal: false,
      hotel: null,
      maxVisibleAmenities: 6,
      showMoreAmenities: false,
    };
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const id = val.params.id;
        this.fetchSingleHotelDetails(id);
      },
    },
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Hotels");
  },
  methods: {
    async fetchSingleHotelDetails(id) {
      this.fetchLoading = true;
      let res = await this.$axios.get("hotel/single/" + id);

      this.hotel = res.data.data.response.hotel;
      this.fetchLoading = false;
    },
    toggleAmenities() {
      this.showMoreAmenities = !this.showMoreAmenities;
    },
  },
};
</script>

<style lang="scss">
.hotel-page {
  padding: 2rem;
  .hotel-header {
    margin-bottom: 2rem;

    .hotel-images {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-right: 2rem;
      max-height: 28rem;

      .feature-image {
        img {
          max-height: 28rem;
          width: 100%;

          margin-bottom: 0.5rem;
        }
      }

      .other-images {
        margin-left: 0.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 0.5rem;
        position: relative;
        column-gap: 0.5rem;
        max-height: 28rem;
        img {
          width: 100%;
          object-fit: cover;
          max-height: 13.8rem;
          margin: 0;
        }
      }

      .more-images-btn {
        display: block;
        position: absolute;
        right: 1rem;
        bottom: 0.5rem;
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
        color: #fff;
        font-size: 1.5rem;
        background: #00000091;
        border-radius: 5rem;

        i {
          margin-right: 0.5rem;
        }

        &:hover {
          background: #000000c4;
        }
      }
    }

    .hotel-info {
      flex: 1;

      h1 {
        margin: 0;
      }

      .hotel-rating {
        font-size: 2.4rem;
        color: #ffb700;
        margin-bottom: 1rem;
      }

      .hotel-score {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        .score {
          font-size: 2.4rem;
          font-weight: bold;
          margin-right: 1rem;
        }

        .score-label {
          font-size: 1.6rem;
        }
      }

      .view-reviews {
        display: inline-block;
        color: #007bff;
        text-decoration: none;
        margin-bottom: 2rem;
      }
    }
  }

  .hotel-details {
    gap: 2rem;
    .rating {
      display: flex;
      align-items: center;
      .rate {
        background: var(--theme-success-color);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
      }
    }

    .hotel-amenities {
      margin-top: 2rem;
      width: 60rem;
      h2 {
        font-weight: 600;
        font-size: 1.9rem;
      }

      ul {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 1rem;
        li {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          img {
            margin-right: 1rem;
          }
        }
      }

      .amenities-see-more-bnt {
        margin: 1rem 0;
        padding-left: 0;
      }
    }
  }

  .hotel-navigation {
    margin-top: 2rem;

    ul {
      list-style: none;
      display: flex;
      gap: 1rem;
      padding: 0;

      li {
        a {
          color: #007bff;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .rooms-wrapper {
    h2 {
      font-size: 1.75rem;
    }
    .rooms {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.hotel-all-images-modal {
  .carousel-image {
    width: 100%;
    height: auto;
  }
  .ant-carousel .custom-slick-arrow {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2.5rem;
    color: #fff;
    background-color: rgb(31 45 61 / 77%);
    opacity: 0.5;
    border-radius: 50%;
  }
  .ant-carousel .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel .custom-slick-arrow:hover {
    opacity: 0.5;
  }
}
</style>
