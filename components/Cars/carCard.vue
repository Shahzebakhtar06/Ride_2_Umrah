<template>
  <div class="car-card">
    <div class="card-content">
      <div class="image-slider-wrapper">
        <!-- <img :src="details.imageUrl" alt="Car Image" /> -->
        <img src="~/static/images/car.png" alt="Car Image" />
      </div>
      <div class="details" @click="goToCarDetails(details.id)">
        <div class="info fit-width">
          <div>
            <div class="great-deal">Great Deal</div>

            <div class="card-title">{{ details.type }}</div>
            <p>{{ details.model }}</p>
            <div class="row mb-1">
              <div class="col p-1 fit-width">
                <i class="fa-solid fa-user" style="margin-right: 0.5rem"></i
                >{{ details.seats }}
              </div>

              <div class="col p-1">
                <i class="fa-solid fa-gears"></i>{{ details.transmission }}
              </div>
            </div>

            <div class="mb-1">
              <i class="fa-solid fa-gas-pump"></i>
              {{ details.mileage }}
            </div>
            <div class="mb-1">
              <i class="fa-solid fa-location-dot"></i>
              {{ details.pickUpLocation.city }}
            </div>
          </div>
          <div class="mb-1" style="margin-top: auto">
            <i class="fa-solid fa-location-dot"></i>
            {{ details.dropOffLocation.city }}
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
      this.$router.push("/cars/" + id);
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
    border: 0.1rem solid var(--theme-border-color);
    align-items: center;
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
      img {
        width: 100%;

        object-fit: cover;
      }
    }

    .details {
      padding: 1rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 0.3fr;
      gap: 1rem;
      .info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        .great-deal {
          background: var(--theme-success-color);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          width: fit-content;
          font-size: smaller;
        }
      }

      .reserve-details {
        max-width: fit-content;
        margin-left: auto;
      }

      h3 {
        margin: 0;
        font-size: 2rem;
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

.image-slider {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
