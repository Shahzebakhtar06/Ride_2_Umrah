<template>
  <div class="container">
    <div class="filters" :class="{ loader: fetchLoading }">
      <BaseFilters
        :fields="staysFilters"
        :fieldsValue="selectedFilters"
        @submit="handleSubmit"
      />
    </div>
    <div>
      <hotels-card
        v-for="(hotel, index) in hotels"
        :key="index"
        :details="hotel"
      />
    </div>
  </div>
</template>

<script>
import hotelsCard from "@/components/Hotel/hotelsCard.vue";
export default {
  components: {
    hotelsCard,
  },
  data() {
    return {
      staysFilters: [
        {
          key: "location",
          label: "Location",
          type: "select",
          value: "",
          placeholder: "Search Location",
        },
        {
          key: "dates",
          label: "Dates",
          type: "date",
          value: [],
          placeholder: "Search Date",
        },
        {
          key: "rooms",
          type: "roomSelect",
          label: "Room Select",
          value: [],

          placeholder: "select Your rooms",
        },
      ],
      selectedFilters: {},
      hotels: [],
      fetchLoading: false,
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
      handler(val) {
        const query = val.query;

        let result = {
          location: query.location,
          rooms: JSON.parse(query.rooms),
          dates: [query.from, query.to],
        };
        this.fetchHotels();
        this.staysFilters.map((el) => {
          el.value = result[el.key];
        });
      },
    },
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Hotels");
  },
  methods: {
    async handleSubmit(formData) {
      let form=JSON.parse(JSON.stringify(formData))
      this.$store.commit("UPDATE_FILTERS", form);
      await this.fetchHotels(formData);
    },
    async fetchHotels(query) {
      let { location: city } = query || this.activeFilters;
      this.fetchLoading = true;
      let res = await this.$axios.post("hotel/filter", { city });

      this.hotels = res.data.data.response.data;
      this.fetchLoading = false;
    },
  },
};
</script>

<style></style>
