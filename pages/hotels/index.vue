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
import hotelsCard from "@/components/hotelsCard.vue";
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
      hotels: [
        {
          hotel_name: "Grand Hotel",
          city_name: "New York",
          guest_liked: true,
          rating: {
            points: 9.0,
            category: "Excellent",
            reviews: 320,
          },
          available: 10,
          price: 250,
          total_price: 300,
        },
        {
          hotel_name: "Ocean View Resort",
          city_name: "Miami",
          guest_liked: false,
          rating: {
            points: 7.5,
            category: "Good",
            reviews: 180,
          },
          available: 3,
          price: 180,
          total_price: 210,
        },
        {
          hotel_name: "Mountain Lodge",
          city_name: "Aspen",
          guest_liked: true,
          rating: {
            points: 8.8,
            category: "Excellent",
            reviews: 250,
          },
          available: 8,
          price: 300,
          total_price: 350,
        },
        {
          hotel_name: "Beachfront Inn",
          city_name: "Maui",
          guest_liked: true,
          rating: {
            points: 8.4,
            category: "Very Good",
            reviews: 200,
          },
          available: 5,
          price: 400,
          total_price: 450,
        },
        {
          hotel_name: "City Lights Hotel",
          city_name: "Paris",
          guest_liked: true,
          rating: {
            points: 8.9,
            category: "Excellent",
            reviews: 300,
          },
          available: 12,
          price: 180,
          total_price: 210,
        },
      ],
    };
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

        console.log(result);
        this.staysFilters.map((el) => {
          el.value = result[el.key];
        });
      },
    },
  },
  methods: {
    handleSubmit(formData) {
      // let query = encodeURIComponent(formData);
      // console.log(query);
      // this.$router.push({ name: "hotels", query: query });
    },
  },
};
</script>

<style></style>
