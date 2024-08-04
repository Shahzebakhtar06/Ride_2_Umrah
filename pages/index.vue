<template>
  <div id="welcome-page">
    <div class="main-image">
      <img src="~/static/images/banner1.jpg" alt="" />
    </div>
    <div class="container" >
      <div class="filter-wrapper container">
        <a-tabs v-model="activeTab">
          <a-tab-pane key="stays" tab="stays">
            <BaseFilters
              :fields="staysFilters"
              :response="false"
              @submit="handleSubmit"
            />
          </a-tab-pane>
          <a-tab-pane key="cars" tab="Cars" force-render>
            <BaseFilters
              :response="false"
              :fields="carsFilters"
              @submit="handleSubmit"
            />
          </a-tab-pane>
          <a-tab-pane key="packages" tab="Packages">
            <BaseFilters
              :response="false"
              :fields="visaFilters"
              @submit="handleSubmit"
            />
          </a-tab-pane>
          <a-tab-pane key="visa" tab="Visa">
            <BaseFilters
              :response="false"
              :fields="visaFilters"
              @submit="handleSubmit"
            />
          </a-tab-pane>
        </a-tabs>
      </div>
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
          value: "",
          placeholder: "Search Location",
        },
        {
          key: "dates",
          label: "Dates",
          type: "date",
          placeholder: ["Start date", "End date"],
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
          key: "pick_up_date",
          date_type: "single",
          label: "Dates",
          type: "date",
          value: null,
          placeholder: "Select Pick Up Date",
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
      } else if (val == "visa") {
        this.$router.push("/visas");
      }
    },
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "");
  },
  methods: {
    handleSubmit(formData) {
      let form = JSON.parse(JSON.stringify(formData));
      this.$store.commit("UPDATE_FILTERS", form);
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
          pick_up_date: formData.pick_up_date?.format("YYYY-MM-DD"),
        };

        this.$router.push({ name: "cars", query: queryObj });
      } else if (this.activeTab == "packages") {
        // const queryObj = {
        //   from_location: formData.from_location,
        //   to_location: formData.to_location,
        //   from: formData.dates[0]?.format("YYYY-MM-DD"),
        //   to: formData.dates[1]?.format("YYYY-MM-DD"),
        // };

        this.$router.push({ name: "cars" });
      }
    },
  },
};
</script>
<style lang="scss">
#welcome-page {
  .main-image {
    img {
      width: 100%;
      object-fit: cover;
      aspect-ratio: 11 / 6;
    }
  }

  .filter-wrapper {
    position: absolute;
    z-index: 1;
    background: var(--theme-light-primary-bg-color);
    top: 30rem;
    border-radius: 2rem;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .main-image {
      height: 80vh;
      img {
        height: 100%;
      }
    }
  }
}

.ant-tabs {
  text-align: center;
  .ant-tabs-bar {
    margin: 0;
    margin-bottom: 1rem;
    border-color: var(--theme-primary-color);
    .ant-tabs-tab {
      color: #fff;
    }
    .ant-tabs-tab-active {
      color: #fff;
      background: #744970;
      border-radius: 1rem;
    }
  }
  @media (max-width: 768px) {
    .ant-tabs-nav-scroll {
      overflow: auto;
    }
  }
}
</style>
