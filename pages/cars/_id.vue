<template>
  <div class="container">
  <div class="car-page" >
    <div>
      <div class="car-card">
        <a-card>
          <div class="card-content">
            <div class="details">
              <div class="great-deal">Great Deal</div>

              <div class="card-title">{{ car.type }}</div>
              <p>{{ car.model }}</p>

              <ul class="car-amenities">
                <li v-for="(amenity, index) in car.amenities" :key="index">
                  <i :class="amenity.icon"></i> {{ amenity.amenity }}
                </li>
              </ul>
            </div>
            <div class="image-slider-wrapper">
              <img src="~/static/images/car.png" alt="Car Image" />
            </div>
          </div>
        </a-card>
      </div>
      <div class="rental-Location">
        <a-card>
          <div class="card-content">
            <h2>Car rental location</h2>
            <strong>Pickup & Drop-off</strong>
            <div>
              <span></span>
              <span>Wed, Aug 7, 10:30am - Thu, Aug 8, 10:30am</span>
            </div>
            <div>
              <span></span>
              <span
                >ISP Airport 150 Arrival Ave Islip Airprt Enterprise Rentca,
                Ronkonkoma, New York, United States 11779</span
              >
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div>
      <a-card>
        <span>
          <h2 style="display: inline">$80</h2>
        </span>
        <span>
          <small>per day</small>
        </span>
      </a-card>
      <a-card class="price-card">
        <h2>Price Details</h2>
        <p>Pay at Pickup</p>
        <a-row>
          <a-col span="12">Car rental fee x 1 day</a-col>
          <a-col span="12">$34.86</a-col>
        </a-row>
        <a-row>
          <a-col span="12">Taxes and fees</a-col>
          <a-col span="12">included</a-col>
        </a-row>
        <hr />
        <a-row>
          <a-col span="12">Total</a-col>
          <a-col span="12">$34.86</a-col>
        </a-row>
        <a-row>
          <a-col span="12">Pay at pick-up</a-col>
          <a-col span="12">$34.86</a-col>
        </a-row>
        <a-button
          style="width: 100%; margin: 1rem 0"
          type="primary"
          shape="round"
          @click="goToCarReserve"
        >
          Reserve</a-button
        >
      </a-card>
    </div>
  </div>
  </div>
</template>
<script>
import carCard from "../../components/Cars/carCard.vue";
export default {
  name: "carPage",
  components: { carCard },
  computed: {},
  data() {
    return {
      showModal: false,
      car: {
        id: 1,
        type: "Compact",
        model: "Toyota Corolla or similar",
        amenities: [
          {
            icon: "fa-solid fa-user",
            amenity: "5 Passengers",
          },
          {
            icon: "fa-solid fa-snowflake",
            amenity: "Air Conditioning",
          },
          {
            icon: "fa-solid fa-gauge-high",
            amenity: "622 free miles/day",
          },
          {
            icon: "fa-solid fa-door-open",
            amenity: "4/5 Doors",
          },
          {
            icon: "fa-solid fa-worm",
            amenity: "Manual",
          },
          {
            icon: "fa-solid fa-gas-pump",
            amenity: "Fuel: full to full",
          },
        ],
        dealType: "Great Deal",

        imageUrl: "/path/to/compact-car-image.png",
      },
    };
  },
  mounted(){
    this.$store.commit("setBannerTitle", "Cars");

  },
  methods:{
    goToCarReserve(){
      this.$router.push('/cars/car-reserve')
    }
    }
};
</script>

<style lang="scss" scoped>
.car-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 2rem;
  .car-card {
    margin: 2rem auto 0;
    padding: 0;
    border: none;

    .card-content {
      display: flex;
      flex-direction: row;

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
        .car-amenities {
          display: grid;
          grid-template-columns: auto 1fr;
          list-style-type: none;
          column-gap: 1.5rem;
          padding: 0;

          li {
            max-width: fit-content;
          }
        }

        .great-deal {
          background: var(--theme-success-color);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          width: fit-content;
          font-size: smaller;
        }
      }
    }
  }
  .ant-card {
    margin: 1rem 0;
    border-radius: 1.5rem;
  }
  .price-card {
  }
}
</style>
