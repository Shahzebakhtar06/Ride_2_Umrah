<template>
  <div class="room-card">
    <div class="card-content">
      <div class="images-wrapper">
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
          <div v-for="(img, index) in details.images" :key="index">
            <img
              :src="$global.imgBasePath + img.name"
              class="carousel-image"
              alt="room Image"
            />
          </div>
        </a-carousel>
      </div>

      <div class="details">
        <div>
          <div class="card-title">
            {{ details.name }}
          </div>
          <p>{{ details.rating }}</p>
        </div>

        <div v-if="visibleRoomAmenities?.length > 0" class="room-amenities">
          <h4>Popular amenities</h4>
          <ul>
            <li v-for="(amenity, index) in visibleRoomAmenities" :key="index">
              <img
                :src="$global.imgBasePath + amenity.image"
                width="30"
                alt=""
              />{{ amenity.name }}
            </li>
          </ul>
        </div>
        <a-button type="link" @click="handelDetailsModal" block>
          See Details
        </a-button>
        <span class="price">Price : {{ details.price }}</span>
      </div>
      <a-button
        type="primary"
        @click="reserveRoom(details)"
        class="reserve-btn"
      >
        Reserve
      </a-button>
    </div>
    <a-modal
      v-model="showDetailsModal"
      title="Room Details"
      width="80rem"
      class="room-details-modal"
      :footer="null"
    >
      <div class="card-content">
        <div class="images-wrapper">
          <a-carousel arrows class="image-slider">
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 1rem; z-index: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div
              slot="nextArrow"
              class="custom-slick-arrow"
              style="right: 1rem"
            >
              <a-icon type="right-circle" />
            </div>
            <div v-for="(img, index) in details.images" :key="index">
              <img
                :src="$global.imgBasePath + img.name"
                class="carousel-image"
                alt="room Image"
              />
            </div>
          </a-carousel>
        </div>

        <div class="details">
          <div>
            <div class="card-title">
              {{ details.name }}
            </div>
            <p>{{ details.rating }}</p>
          </div>

          <div v-if="details.amenities?.length > 0" class="room-amenities">
            <h4>Popular amenities</h4>
            <ul>
              <li v-for="(amenity, index) in details.amenities" :key="index">
                <img
                  :src="$global.imgBasePath + amenity.image"
                  width="30"
                  alt=""
                />{{ amenity.name }}
              </li>
            </ul>
          </div>
          <span class="price">Price : {{ details.price }}</span>
        </div>
        <a-button type="cancel" @click="handelDetailsModal"> Cancel </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "roomCard",
  props: { details: Object },
  data() {
    return {
      showDetailsModal: false,
    };
  },
  computed: {
    visibleRoomAmenities() {
      return this.details.amenities.slice(0, 6);
    },
  },
  methods: {
    ...mapActions(["addToCart"]),
    reserveRoom(details) {
      this.addToCart({ type: "Room", data: details });
      this.$notification.success({ message: "AddToCart successfully" });
    },
    handelDetailsModal() {
      this.showDetailsModal = !this.showDetailsModal;
    },
  },
};
</script>

<style lang="scss">
.room-card {
  width: 30rem;
  margin: 2rem;
  padding: 0;

  border: none;
  .card-content {
    border: 0.1rem solid var(--theme-border-color);
    border-radius: 1.5rem;
    overflow: hidden;
    .card-title {
      font-size: 1.6rem;
      font-weight: 800;
    }
    .room-amenities {
      width: 100%;
      h4 {
        font-size: 1.6rem;
        font-weight: 500;
      }
      ul {
        list-style: none;
        padding: 0;
        li {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          img {
            margin-right: 1rem;
          }
        }
      }
    }
    .details {
      padding: 1rem;
      width: 100%;
    }
    .images-wrapper {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ant-carousel .custom-slick-arrow {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 2.5rem;
        color: #fff;
        background-color: var(--theme-primary-color);
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
  }
  .price {
    font-size: 1.7rem;
    font-weight: bold;
    /* color: #52c41a; */
  }
  .reserve-btn {
    margin: 1rem auto;
    display: block;
    font-size: large;
    font-weight: 600;
  }

  .details {
    h3 {
      margin: 0;
      font-size: 2rem;
    }
    p {
      margin: 0.5rem 0;
    }
  }
}

.room-details-modal {
  .card-content {
    .card-title {
      font-size: 1.6rem;
      font-weight: 800;
    }
    .room-amenities {
      width: 100%;
      h4 {
        font-size: 1.6rem;
        font-weight: 500;
      }
      ul {
        list-style: none;
        padding: 0;
        li {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          img {
            margin-right: 1rem;
          }
        }
      }
    }
    .details {
      padding: 1rem;
      width: 100%;
    }
    .images-wrapper {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
      }
      .ant-carousel .custom-slick-arrow {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 2.5rem;
        color: #fff;
        background-color: var(--theme-primary-color);
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
    .price {
      font-size: 2rem;
      font-weight: bold;
    }
  }
}
</style>
