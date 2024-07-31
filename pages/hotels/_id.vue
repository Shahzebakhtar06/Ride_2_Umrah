<template>
  <div class="container" :class="{ loader: fetchLoading }">
    <div v-if="hotel" class="hotel-page">
      <div class="hotel-header">
        <div class="hotel-images">
          <div class="feature-image">
            <img
              :src="$global.imgBasePath + hotel.featureImage"
              alt="Feature Image"
            />
          </div>
          <div class="other-images">
            <img v-for="i in 4" :key="i" :src="otherImages[i]" alt="Image" />
            <button
              v-if="otherImages.length > 4"
              class="more-images-btn"
              @click="showModal = true"
            >
              <i class="fa-regular fa-images"></i> {{ otherImages.length - 4 }}
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
          <li><a href="#accessibility">Accessibility</a></li>
          <li><a href="#policies">Policies</a></li>
        </ul>
      </div>
      <div class="hotel-details">
        <div class="hotel-info">
          <h1>{{ hotel.name }}</h1>
          <!-- <div class="hotel-rating">★★★★★</div> -->
          <p>{{ hotel.short_description }}</p>
          <div class="rating">
            <div class="rate fit-width">
              {{ hotel.rating }}
            </div>
          </div>
        </div>
        <div class="hotel-amenities">
          <h2>Popular amenities</h2>
          <ul>
            <li v-for="(amenity, index) in hotel.amenities" :key="index">
              <i :class="amenity.icon"></i> {{ amenity.name }}
            </li>
          </ul>
        </div>
        <div v-html="hotel.description"></div>
      </div>

      <div class="rooms-wrapper" v-if="hotel.rooms.length">
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
        :footer="null"
      >
        <a-carousel>
          <div v-for="(image, index) in allImages" :key="index">
            <img :src="$global.imgBasePath + image" alt="Image" class="carousel-image" />
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
      return [...this.featureImage, ...this.otherImages];
    },
  },
  data() {
    return {
      fetchLoading: true,
      showModal: false,
      featureImage: require("~/static/images/feature-image.avif"),
      otherImages: [
        require("~/static/images/1.avif"),
        require("~/static/images/2.avif"),
        require("~/static/images/3.avif"),
        require("~/static/images/4.avif"),
        require("~/static/images/5.avif"),
        require("~/static/images/6.avif"),
        require("~/static/images/7.avif"),
      ],

      mapImage: "/path/to/map-image.jpg",
      hotel: null,
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
    this.$store.commit("setBannerTitle", "Hotels");
  },
  methods: {
    async fetchSingleHotelDetails(id) {
      this.fetchLoading = true;
      let res = await this.$axios.get("hotel/single/" + id);

      this.hotel = res.data.data.response.hotel;
      this.fetchLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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

          i {
            font-size: 2rem;
            margin-right: 1rem;
          }
        }
      }

      .view-all-amenities {
        display: inline-block;
        color: #007bff;
        text-decoration: none;
      }
    }

    .hotel-location {
      flex: 1;

      h2 {
        margin: 0;
      }

      .hotel-map {
        width: 100%;
        height: auto;
        margin-bottom: 1rem;
      }

      .nearby-locations {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;

          i {
            font-size: 1.6rem;
            margin-right: 1rem;
          }

          .distance {
            margin-left: auto;
          }
        }
      }

      .view-map,
      .view-more {
        display: inline-block;
        color: #007bff;
        text-decoration: none;
        margin-bottom: 1rem;
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
  .rooms {
    display: flex;
    flex-wrap: wrap;
  }
  .carousel-image {
    width: 100%;
    height: auto;
  }
}
</style>
