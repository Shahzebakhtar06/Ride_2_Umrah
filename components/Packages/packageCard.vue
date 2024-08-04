<template>
  <div class="car-card">
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
          <div v-for="(img, index) in details.images" :key="index">
            <img
              :src="$global.imgBasePath + img.name"
              class="carousel-image"
              alt="Hotel Image"
            />
          </div>
        </a-carousel>
      </div>
      <div class="details" @click="goToCarDetails(details.id)">
        <div class="info fit-width">
          <div>
            <div class="card-title">{{ details.name }}</div>
            <p>{{ details.short_description }}</p>
          </div>
          <div class="rating row">
            <div class="rate col fit-width">
              {{ details.rating }}
            </div>
          </div>
        </div>
        <div class="reserve-details mb-1">
          <div class="price-info">
            <span class="price">${{ details.price }}</span>
          </div>
          <a-button type="primary" shape="round"> Reserve</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarCard",
  props: {
    details: Object,
  },
  data() {
    return {};
  },
  methods: {
    goToCarDetails(id) {
      this.$router.push("/packages/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.mobile-view {
  .car-card {
    height: auto;
    display: inline-flex;
    flex-wrap: wrap;
    width: 50rem;
    margin: 3rem;
    height: auto;
    .card-content {
      flex-direction: column;
      .image-slider-wrapper {
        width: auto;
      }
      .details {
        grid-template-columns: 1fr;
      }
    }
  }
}
.car-card {
  width: 100rem;
  margin: 2rem auto 0;
  padding: 0;
  border: none;

  .card-content {
    background: #fff;
    display: flex;
    flex-direction: row;
    border: 0.1rem solid var(--theme-border-color);
    border-radius: 1.5rem;
    overflow: hidden;
    margin-bottom: 1rem;

    .card-title {
      font-size: 1.8rem;
      font-weight: 500;
      text-align: left;
    }

    .image-slider-wrapper {
      display: block;
      width: 27rem;
      .carousel-image {
        width: 100%;
        height: 100%;
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

    .details {
      padding: 1rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 0.3fr;
      gap: 1rem;
      .info {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
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
      }

      .reserve-details {
        max-width: fit-content;
        margin-left: auto;
        margin-top: auto;
      }

      p {
        margin: 0.5rem 0;
      }

      .price-info {
        margin: 1rem 0;
        text-align: end;
      }

      .price {
        font-size: 2.4rem;
        font-weight: bold;
      }

      .total-price {
        display: block;
        color: gray;
      }
    }
  }
}
</style>
