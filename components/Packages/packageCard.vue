<template>
  <div class="car-card">
    <div class="card-content">
      <div class="image-slider-wrapper">
        <a-carousel arrows class="image-slider">
          <div
            slot="prevArrow"
            class="custom-slick-arrow"
            style="left: 10px; z-index: 1"
          >
            <a-icon type="left-circle" />
          </div>
          <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
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
      <div class="details" @click="goToCarDetails(details.id)">
        <div class="info fit-width">
          <div>
            <div class="card-title">{{ details.name }}</div>
            <p>{{ details.shortDescription }}</p>
          </div>
          <div class="rating row">
            <div class="rate col fit-width">
              {{ details.rating.points }}
            </div>
            <div class="col px-1">
              <div>
                <b>{{ details.rating.category }}</b>
              </div>
            </div>
          </div>
        </div>
        <div class="reserve-details mb-1">
          <div class="price-info">
            <span class="price">${{ details.price }}</span>
            <span class="total-price">${{ details.totalPrice }} total</span>
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
    return {
      carRentals: [
        {
          id: 1,
          type: "Compact",
          model: "Toyota Corolla or similar",
          price: 35,
          rating: {
            points: 8.3,
            category: "Great Deal",
            reviews: 120,
          },
          totalPrice: 35,
          imageUrl: "/path/to/compact-car-image.png",
        },
        {
          id: 2,
          type: "Midsize",
          model: "Honda Civic or similar",
          price: 49,
          rating: {
            points: 8.0,
            category: "Great Deal",
            reviews: 100,
          },
          totalPrice: 49,
          imageUrl: "/path/to/midsize-car-image.png",
        },
      ],
    };
  },
  methods: {
    goToCarDetails(id) {
      this.$router.push("/packages/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.car-card {
  width: 100rem;
  margin: 2rem auto 0;
  padding: 0;
  border: none;

  .card-content {
    background: #fff;
    display: flex;
    flex-direction: row;
    border: 1px solid var(--theme-border-color);
    border-radius: 1.5rem;
    overflow: hidden;
    margin-bottom: 1rem;

    .card-title {
      font-size: 1.8rem;
      font-weight: 500;
    }

    .image-slider-wrapper {
      display: block;
      width: 27rem;
      .image-slider {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .details {
      padding: 1rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 0.3fr;
      gap: 10px;
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
        margin: 5px 0;
      }

      .price-info {
        margin: 10px 0;
        text-align: end;
      }

      .price {
        font-size: 24px;
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
