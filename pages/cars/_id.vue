<template>
  <div class="container">
    <div class="car-page" v-if="car">
      <div>
        <div class="car-card">
          <a-card>
            <div class="card-content">
              <div class="details">
                <div class="great-deal">Great Deal</div>

                <div class="card-title">{{ car.type }}</div>
                <p>{{ car.model }}</p>

                <ul class="car-amenities">
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
                  v-if="car.car.amenities?.length > maxVisibleAmenities"
                  type="link"
                  class="amenities-see-more-bnt"
                  @click="toggleAmenities"
                >
                  {{
                    showMoreAmenities
                      ? "See Less Amenities"
                      : "See All Amenities"
                  }}
                </a-button>
              </div>
              <div class="image-slider-wrapper">
                <img :src="$global.imgBasePath + car.image" alt="Car Image" />
              </div>
            </div>
          </a-card>
        </div>
        <div class="rental-Location">
          <a-card>
            <div class="card-content">
              <h2>Car rental location</h2>

              <div>
                <a-row justify="space-between">
                  <a-col :span="16"><strong>Pickup Date</strong></a-col>
                  <a-col :span="8">
                    <span>{{
                      moment(activeFilters.pick_up_date).format(
                        "ddd, MMM D, YYYY"
                      )
                    }}</span></a-col
                  >
                </a-row>
              </div>
              <div>
                <a-row justify="space-between">
                  <a-col :span="16"><strong>Pickup Location</strong></a-col>
                  <a-col :span="8">
                    <span
                      >{{ locationName(activeFilters.from_location) }}
                    </span></a-col
                  >
                </a-row>
                <a-row justify="space-between">
                  <a-col :span="16"><strong>Drop off Location</strong></a-col>
                  <a-col :span="8">
                    <span>
                      {{ locationName(activeFilters.to_location) }}</span
                    ></a-col
                  >
                </a-row>
              </div>
            </div>
          </a-card>
        </div>
      </div>
      <div>
        <a-card class="price-card">
          <a-row>
            <a-col span="12">Total</a-col>
            <a-col span="12">{{ car.price }}</a-col>
          </a-row>

          <a-button
            style="width: 100%; margin: 1rem 0"
            type="primary"
            shape="round"
            :loading="reserveBtnLoading"
            @click="reserveCar(car)"
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
import moment from "moment";

import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "carPage",
  components: { carCard },
  data() {
    return {
      moment,
      reserveBtnLoading: false,
      fetchLoading: true,
      showModal: false,
      maxVisibleAmenities: 6,
      showMoreAmenities: false,
      car: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const id = val.params.id;
        this.fetchSingleCarDetails(id);
      },
    },
  },
  computed: {
    ...mapState(["activeFilters"]),
    ...mapGetters(["getLocations"]),
    visibleAmenities() {
      return this.showMoreAmenities
        ? this.car.car.amenities
        : this.car.car.amenities?.slice(0, this.maxVisibleAmenities);
    },
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Cars");
  },
  methods: {
    ...mapActions(["addToCart"]),
    reserveCar(details) {
      this.reserveBtnLoading = true;
      setTimeout(() => {
        this.addToCart({
          cartType: "Car",
          ...details,
          ...this.activeFilters,
        });
        this.$notification.success({ message: "AddToCart successfully" });
        this.reserveBtnLoading = false;
        this.$store.dispatch("showConfirmModal", true);

      }, 2000);
    },
    async fetchSingleCarDetails(id) {
      this.fetchLoading = true;
      let res = await this.$axios.get(
        `car/single?id=${id}&from=${this.activeFilters.from_location}&to=${this.activeFilters.to_location}`
      );

      this.car = res.data.data.response.car;
      this.fetchLoading = false;
    },
    toggleAmenities() {
      this.showMoreAmenities = !this.showMoreAmenities;
    },
    locationName(id) {
      return this.getLocations.find((el) => el.id == id)?.name;
    },
  },
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
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          row-gap: 1rem;
          li {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            max-width: fit-content;

            img {
              margin-right: 1rem;
            }
          }

          .amenities-see-more-bnt {
            margin: 1rem 0;
            padding-left: 0;
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
