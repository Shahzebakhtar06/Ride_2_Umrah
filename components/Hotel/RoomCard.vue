<template>
  <div class="hotel-card">
    <div class="card-content">
      <div class="image-slider-wrapper">
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
          <div>
            <img src="https://via.placeholder.com/600x400" alt="Hotel Image" />
          </div>
          <div>
            <img src="https://via.placeholder.com/600x400" alt="Hotel Image" />
          </div>
        </a-carousel>
      </div>
      <div class="details" >
        <div>
          <div class="card-title">
            {{ details.hotel_name }}
          </div>
          <p>{{ details.rating }}</p>
        </div>
        <div>
          <div class="hotel-amenities">
            <h2>Popular amenities</h2>
            <ul>
              <li v-for="(amenity, index) in details.amenities" :key="index">
                <i :class="amenity.icon"></i> {{ amenity.name }}
              </li>
            </ul>
          </div>
        </div>
        <span class="price">Price {{ details.price }}</span>
      </div>
      <a-button type="primary" @click="goToReservePage" class="reserve-btn"> Reserve </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelCard",
  props: { details: Object },
  methods: {
    goToReservePage() {
      this.$router.push("/hotels/room-reserve?id=" + 1);
    },
  },
};
</script>

<style scoped lang="scss">
.hotel-card {
  width: 30rem;
  margin: 2rem;
  padding: 0;

  border: none;
  .card-content {
    border: 0.1rem solid var(--theme-border-color);
    border-radius: 1.5rem;
    overflow: hidden;
    .card-title {
      font-size: 2.4rem;
      font-weight: 800;
    }
    .image-slider-wrapper {
      width: 100%;

      .ant-carousel .custom-slick-arrow {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 2.5rem;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
        opacity: 0.3;
      }
      .ant-carousel .custom-slick-arrow:before {
        display: none;
      }
      .ant-carousel .custom-slick-arrow:hover {
        opacity: 0.5;
      }
    }
    .hotel-amenities {
      width: 100%;

      ul {
        list-style: none;
        padding: 0;
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
    }
    .details {
      padding: 1rem;
      width: 100%;
    }
  }
}
.reserve-btn {
  margin: 1rem auto;
  display: block;
  font-size: large;
  font-weight: 600;
}
.image-slider {
  width: 100%;
  height: 100%;
}

.image-slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details h3 {
  margin: 0;
  font-size: 2rem;
}

.details p {
  margin: 0.5rem 0;
}

.reserve-now {
  margin: 1rem 0;
  display: block;
}

.price-info {
  margin: 1rem 0;
  text-align: end;
}

.price {
  font-size: 2.4rem;
  font-weight: bold;
  /* color: #52c41a; */
}

.total-price {
  display: block;
  color: gray;
}

.availability {
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  margin-left: auto;
}
</style>
