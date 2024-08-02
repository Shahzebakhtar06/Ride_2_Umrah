<template>
  <div class="container">
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
import { pick } from "lodash";
export default {
  components: {
    carsCard,
  },
  data() {
    return {
      fetchLoading: true,
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
          key: "pick_up_date",
          date_type: "single",
          label: "Dates",
          type: "date",
          value: null,
          placeholder: "Select Pick Up Date",
        },
      ],
      selectedFilters: {},
      cars: [],
    };
  },
  computed: {
    activeFilters() {
      return this.$store.state.activeFilters;
    },
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.carsFilters.map((el) => {
          el.value = this.activeFilters[el.key];
        });
        this.fetchCars();
      },
    },
    activeFilters: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val != undefined) {
          const data = JSON.parse(JSON.stringify(val));
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
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Cars");
  },
  methods: {
    async handleSubmit(formData) {
      let form = JSON.parse(JSON.stringify(formData));
      this.$store.commit("UPDATE_FILTERS", form);
      await this.fetchCars(formData);
    },
    async fetchCars(form) {
      let { from_location: from, to_location: to } = form || this.activeFilters;
      this.fetchLoading = true;
      let res = await this.$axios.post("car/filter", { from, to });

      this.cars = res.data.data.response.data;
      this.fetchLoading = false;
    },
  },
};
</script>

<style></style>
