<template>
  <div>
    <div class="filters">
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
  methods: {
    async handleSubmit(formData) {
      this.$store.commit("updateFilters", formData);
      await this.fetchHotels(formData);
    },
    async fetchHotels(query) {
      let { location: city } = query || this.activeFilters;
      let res = await this.$axios.post("hotel/filter", { city });

      this.hotels = res.data.data.response.data;
    },
  },
};
</script>

<style></style>
