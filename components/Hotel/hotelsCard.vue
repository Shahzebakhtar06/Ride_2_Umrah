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
          <div v-for="(img, index) in hotelImages" :key="index">
            <img :src="$global.imgBasePath + img.name" alt="Hotel Image" />
          </div>
        </a-carousel>
      </div>
      <div class="details" @click="goToHotelDetails(details.id)">
        <div>
          <div class="card-title">
            {{ details.name }}
          </div>
          <p>
            {{ details.city.name }}
          </p>
          <p>
            {{ details.short_description }}
          </p>
          <div>
            <div class="rating">
              <div class="rate fit-width">
                {{ details.rating }}
              </div>
            </div>
          </div>
        </div>

        <div class="reserve-details">
          <div class="price-info">
            <span class="price">
              Total Price: {{ $global.priceSymbol }}{{ details.price }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelCard",
  props: { details: Object },
  data() {
    return {};
  },
  computed: {
    hotelImages() {
      let images = this.details.images || [];
      return [...images, this.details.featured_image];
    },
  },
  methods: {
    goToHotelDetails(id) {
      this.$router.push("/hotels/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.hotel-card {
  width: 100rem;
  margin: auto;
  margin-top: 2rem;
  padding: 0;

  border: none;
  .card-content {
    background: #fff;
    display: flex;
    flex-direction: row;
    border: 0.1rem solid var(--theme-border-color);
    border-radius: 1.5rem;
    overflow: hidden;
    .card-title {
      font-size: 2.4rem;
      font-weight: 800;
    }
    .image-slider-wrapper {
      width: 27rem;

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
      .reserve-details {
        max-width: fit-content;
        margin-left: auto;
        margin-top: auto;
      }
    }
  }
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
