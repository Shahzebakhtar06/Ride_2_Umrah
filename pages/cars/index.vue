<template>
  <div>
    <div class="filters">
      <BaseFilters
        :fields="carsFilters"
        :fieldsValue="selectedFilters"
        @submit="handleSubmit"
      />
    </div>
    <div>
      <cars-card v-for="(car, index) in cars" :key="index" :details="car" />
    </div>
  </div>
</template>

<script>
import carsCard from "@/components/Cars/carCard.vue";
export default {
  components: {
    carsCard,
  },
  data() {
    return {
      carsFilters: [
        {
          key: "from_location",
          label: "Pick Up",
          value: "",
          type: "select",
          placeholder: "Select Pickup Location",
        },
        {
          key: "to_location",
          label: "Drop Off",
          type: "select",
          value: "",
          placeholder: "Select Drop Off Location",
        },
        {
          key: "dates",
          label: "Dates",
          type: "date",
          value: [],
          placeholder: "Select Date",
        },
      ],
      selectedFilters: {},
      cars: [
        {
          id: 1,
          type: "Compact",
          model: "Toyota Corolla or similar",
          price: 35,
          transmission: "Manual",
          seats: 5,
          luggage: 4,
          mileage: "622 free miles/day",
          pickUpLocation: {
            city: "Islamabad",
            distanceFromCityCenter: "5.1 mi",
            address: "Plot D-14, Feroz Centre, 5th Floor Haq Road Blue Area",
          },
          dropOffLocation: {
            city: "Islamabad",
            distanceFromCityCenter: "1.5 mi",
            address: "Plot D-14, Feroz Centre, 5th Floor Haq Road Blue Area",
          },
          dealType: "Great Deal",
          cancellation: "Free cancellation",
          paymentMethod: "Pay at pick-up",
          company: "Hertz",
          totalPrice: 35,
          imageUrl: "/path/to/compact-car-image.png",
        },
        {
          id: 2,
          type: "Midsize",
          model: "Honda Civic or similar",
          price: 49,
          transmission: "Manual",
          seats: 5,
          luggage: 4,
          mileage: "622 free miles/day",
          pickUpLocation: {
            city: "Islamabad",
            distanceFromCityCenter: "5.1 mi",
            address: "Plot D-14, Feroz Centre, 5th Floor Haq Road Blue Area",
          },
          dropOffLocation: {
            city: "Islamabad",
            distanceFromCityCenter: "1.5 mi",
            address: "Plot D-14, Feroz Centre, 5th Floor Haq Road Blue Area",
          },
          dealType: "Great Deal",
          cancellation: "Free cancellation",
          paymentMethod: "Pay at pick-up",
          company: "Hertz",
          totalPrice: 49,
          imageUrl: "/path/to/midsize-car-image.png",
        },
      ],
    };
  },
  computed: {
    activeFilters() {
      return this.$store.state.activeFilters;
    },
  },
  watch: {
    // $route: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     const query = val.query;

    //     let result = {
    //       location: query.location,
    //       dates: [query.from, query.to],
    //     };

    //     this.carsFilters.map((el) => {
    //       el.value = result[el.key];
    //     });
    //   },
    // },
    activeFilters: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val != undefined) {
          const data = JSON.parse(JSON.stringify(val));
          debugger;
          this.carsFilters.map(({ key }) => {
            let index = this.carsFilters.findIndex((item) => item.key == key);
            if (index > 0) {
              this.carsFilters[index].value = data[key];
            }
          });
        }
      },
    },
  },
  methods: {
    handleSubmit(formData) {
      // let query = encodeURIComponent(formData);
      // console.log(query);
      // this.$router.push({ name: "cars", query: query });
    },
  },
};
</script>

<style></style>
