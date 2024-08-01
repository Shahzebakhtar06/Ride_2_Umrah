<template>
  <div class="container">
    <div class="packages">
      <a-tabs v-model="activeKey">
        <a-tab-pane v-for="(data, el) in packages" :key="el">
          <div slot="tab">
            {{ el }}
            <a-icon type="star" theme="filled" style="color: #ffb300" />
          </div>
          <package-card
            v-for="(item, index) in data"
            :key="index"
            :details="item"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
    <div></div>
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
      selectedFilters: {},
      activeKey: "1",
      packages: {
        1: [
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
        2: [
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
        3: [
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
      },
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
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Packages");
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

<style lang="scss">
.packages {
  .ant-tabs-nav-wrap {
    text-align: center;
  }
}
</style>
