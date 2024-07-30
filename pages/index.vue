<template>
  <div>
    <div>
      <a-tabs v-model="activeTab">
        <a-tab-pane key="stays" tab="stays">
          <BaseFilters :fields="staysFilters" @submit="handleSubmit" />
        </a-tab-pane>
        <a-tab-pane key="cars" tab="Cars" force-render>
          <BaseFilters :fields="carsFilters" @submit="handleSubmit" />
        </a-tab-pane>
        <a-tab-pane key="packages" tab="Packages">
          <BaseFilters :fields="visaFilters" @submit="handleSubmit" />
        </a-tab-pane>
        <a-tab-pane key="visa" tab="Visa">
          <BaseFilters :fields="visaFilters" @submit="handleSubmit" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      activeTab: "stays",
      staysFilters: [
        {
          key: "location",
          label: "Location",
          type: "select",
          value: "pakistan",
          placeholder: "Search Location",
        },
        {
          key: "dates",
          label: "Dates",
          type: "date",
          value: null,
          placeholder: "Search Date",
        },
        {
          key: "room",
          type: "roomSelect",
          label: "Travelers",
          value: [{ adults: 1, children: 0 }],
          placeholder: "select Your rooms",
        },
      ],
      carsFilters: [
        {
          key: "from_location",
          label: "Pick Up",
          type: "select",
          placeholder: "Select Pickup Location",
        },
        {
          key: "to_location",
          label: "Drop Off",
          type: "select",
          placeholder: "Select Drop Off Location",
        },
        {
          key: "dates",
          label: "Dates",
          type: "date",
          placeholder: "Select Date",
        },
      ],
      visaFilters: [
        {
          key: "location",
          label: "Location",
          type: "select",
          placeholder: "Search Location",
        },
        {
          key: "dates",
          label: "Dates",
          type: "date",
          placeholder: "Search Date",
        },
      ],
    };
  },
  watch: {
    activeTab(val) {
      if (val == "packages") {
        this.$router.push("/packages");
      } else if (val == "Visa") {
        this.$router.push("/visas");
      }
    },
  },
  methods: {
    handleSubmit(formData) {
      if (this.activeTab == "stays") {
        const queryObj = {
          location: formData.location,
          from: formData.dates[0]?.format("YYYY-MM-DD"),
          to: formData.dates[1]?.format("YYYY-MM-DD"),
          rooms: JSON.stringify(formData?.room),
        };

        this.$router.push({ name: "hotels", query: queryObj });
      } else if (this.activeTab == "cars") {
        const queryObj = {
          from_location: formData.from_location,
          to_location: formData.to_location,
          from: formData.dates[0]?.format("YYYY-MM-DD"),
          to: formData.dates[1]?.format("YYYY-MM-DD"),
        };

        this.$router.push({ name: "cars", query: queryObj });
      } else if (this.activeTab == "packages") {
        const queryObj = {
          from_location: formData.from_location,
          to_location: formData.to_location,
          from: formData.dates[0]?.format("YYYY-MM-DD"),
          to: formData.dates[1]?.format("YYYY-MM-DD"),
        };

        this.$router.push({ name: "cars", query: queryObj });
      }
    },
  },
};
</script>
<style lang="scss">
.ant-tabs {
  text-align: center;
  border: 0.1rem solid var(--theme-border-color);
  .ant-tabs-bar {
    margin: 0;
    margin-bottom: 1rem;
  }
}
</style>
