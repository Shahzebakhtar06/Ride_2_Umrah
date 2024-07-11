<template>
  <div>
    <div class="filters">
      <BaseFilters
        :fields="staysFilters"
        :fieldsValue="selectedFilters"
        @submit="handleSubmit"
      />
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
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
