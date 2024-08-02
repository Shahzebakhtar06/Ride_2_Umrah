<template>
  <div class="reservation-page">
    <div class="container">
      <div class="card-wrapper">
        <div v-for="(item, index) in cartItems" :key="index" class="card">
          <a-card :title="item.cartType">
            <component
              :is="getComponentName(item)"
              :details="item"
              :getLocationName="locationName"
              :formattedDate="formattedDate"
            ></component>
            <template slot="actions">
              <a-button type="danger" ghost @click="removeFromCart(index)"
                >Remove from Cart</a-button
              >
            </template>
          </a-card>
        </div>
      </div>
      <div class="reserve-form">
        <a-form-model
          ref="loginForm"
          :model="form"
          :rules="rules"
          :labelCol="{ span: 5 }"
          :wrapperCol="{ span: 18 }"
        >
          <a-form-model-item has-feedback label="Full Name" prop="name">
            <a-input
              v-model="form.name"
              type="text"
              autocomplete="off"
              placeholder="Full Name"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="Email Address" prop="email">
            <a-input
              v-model="form.email"
              type="text"
              autocomplete="off"
              placeholder="Email Address for confirmation"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="Phone Number" prop="phone">
            <a-input
              style="width: 100%"
              v-model="form.phone"
              autocomplete="off"
              placeholder="Phone Number"
            />
          </a-form-model-item>
          <a-form-model-item style="text-align: center">
            <a-button type="primary" @click="bookNow"> Book Now</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import CarCard from "../components/Reservation/CarCard.vue";
import RoomCard from "../components/Reservation/RoomCard.vue";
import PackageAndVisaCard from "../components/Reservation/PackageAndVisaCard.vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  components: {
    CarCard,
    RoomCard,
    PackageAndVisaCard,
  },
  computed: {
    ...mapGetters(["cartItems", "getLocations"]),
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "Room Name is required!",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Phone Number is required!",
            trigger: "blur",
          },
        ],
      },
      bookingItems: [],
    };
  },
  watch: {
    cartItems: {
      immediate: true,
      deep: true,
      handler(val) {
        let items = [];
        val.forEach((el) => {
          let obj = {
            type: el.cartType.toLowerCase(),
            entity_id: el.id,
          };
          if (el.cartType.toLowerCase() == "room") {
            el.rooms.forEach((item) => {
              let roomObj = {
                type: el.cartType.toLowerCase(),
                entity_id: el.id,
              };

              roomObj.from = el.dates?.length ? el.dates[0] : 0;

              roomObj.to = el.dates?.length ? el.dates[1] : 0;

              roomObj.adult = item.adults;
              roomObj.children = item.children;
            items.push(roomObj);

            });
          }
          if (el.cartType.toLowerCase() == "car") {
            obj.from_id = el.from_location;
            obj.to_id = el.to_location;
            obj.pick_up = el.pick_up_date
              ? moment(el.pick_up_date).format("YYYY-MM-DD")
              : 0;
          }
          if (el.cartType.toLowerCase() !== "room") {
            items.push(obj);
          }
        });
        console.log(items)
        this.bookingItems = items;
      },
    },
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    getComponentName({ cartType }) {
      if (cartType) {
        let name = cartType;
        if (name.toLowerCase() == "package" || name.toLowerCase() == "visa") {
          name = "PackageAndVisa";
        }
        return name + "Card";
      }
    },
    formattedDate(val) {
      return moment(val).format("ddd, MMM D, YYYY");
    },
    locationName(id) {
      return this.getLocations.find((el) => el.id == id)?.name;
    },
    async bookNow() {
      let form = this.form;
      let obj = {
        name: form.name,
        contact: form.phone,
        items: this.bookingItems,
      };
      console.log(obj);
      // let res = await this.$axios.post("booking", obj);
      this.$notification.success({ message: "Booking successful" });
    },
  },
};
</script>

<style lang="scss">
.reservation-page {
  .card-wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .card {
      width: 35rem;
      margin: 0.5rem;
      .ant-card {
        height: 100%;

        display: flex;
        flex-flow: column;
        .ant-card-actions {
          margin-top: auto !important;
          height: 5rem;
        }
      }
    }
  }
  .reserve-form {
    width: 60rem;
    margin: auto;
    margin-top: 5rem;
  }
}
</style>
