<template>
  <div>
    <div class="filters">
      <BaseFilters
        :fields="packagesFilters"
        :fieldsValue="selectedFilters"
        @submit="handleSubmit"
      />
    </div>
    <div>
      <package-card
        v-for="(item, index) in packages"
        :key="index"
        :details="item"
      />
    </div>
  </div>
</template>

<script>
import packageCard from "@/components/Packages/packageCard.vue";
export default {
  components: {
    packageCard,
  },
  data() {
    return {
      packagesFilters: [
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
      packages: [
        {
          name: "Saja Al Madinah Hotel",
          shortDescription: "Madinah City Center",
          rating: {
            points: 8.0,
            category: "Very Good",
          },

          totalPrice: 1173,
          price: 586,
        },
        {
          name: "Pullman Zamzam Madina",
          shortDescription: "Madinah City Center",
          rating: {
            points: 8.2,
            category: "Very Good",
          },

          totalPrice: 1257,
          reviews: 1004,
          price: 628,
        },
        {
          name: "Intercontinental Madinah - Dar Al Iman, an IHG Hotel",
          shortDescription: "Madinah City Center",

          rating: {
            points: 8.8,
            category: "Excellent",
          },

          totalPrice: 1857,
          price: 670,
        },
        {
          name: "Anwar Al Madinah Mövenpick Hotel",
          shortDescription: "Madinah City Center",
          rating: {
            points: 6.8,
            category: "Good",
          },

          totalPrice: 1657,

          price: 629,
        },
      ],
    };
  },
  watch: {
    activeFilters: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val != undefined) {
          const data = JSON.parse(JSON.stringify(val));
          debugger;
          this.packagesFilters.map(({ key }) => {
            let index = this.packagesFilters.findIndex(
              (item) => item.key == key
            );
            if (index > 0) {
              this.packagesFilters[index].value = data[key];
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
      // this.$router.push({ name: "hotels", query: query });
    },
  },
};
</script>

<style></style>
