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
      activeKey: "1.0",
      fetchLoading:true,
      packages: {
        // 1: [
        //   {
        //     name: "Saja Al Madinah Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.0,
        //       category: "Very Good",
        //     },
        //     totalPrice: 1173,
        //     price: 586,
        //   },
        //   {
        //     name: "Pullman Zamzam Madina",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.2,
        //       category: "Very Good",
        //     },
        //     totalPrice: 1257,
        //     reviews: 1004,
        //     price: 628,
        //   },
        //   {
        //     name: "Intercontinental Madinah - Dar Al Iman, an IHG Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.8,
        //       category: "Excellent",
        //     },
        //     totalPrice: 1857,
        //     price: 670,
        //   },
        //   {
        //     name: "Anwar Al Madinah Mövenpick Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 6.8,
        //       category: "Good",
        //     },
        //     totalPrice: 1657,
        //     price: 629,
        //   },
        // ],
        // 2: [
        //   {
        //     name: "Saja Al Madinah Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.0,
        //       category: "Very Good",
        //     },
        //     totalPrice: 1173,
        //     price: 586,
        //   },
        //   {
        //     name: "Pullman Zamzam Madina",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.2,
        //       category: "Very Good",
        //     },
        //     totalPrice: 1257,
        //     reviews: 1004,
        //     price: 628,
        //   },
        //   {
        //     name: "Intercontinental Madinah - Dar Al Iman, an IHG Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.8,
        //       category: "Excellent",
        //     },
        //     totalPrice: 1857,
        //     price: 670,
        //   },
        //   {
        //     name: "Anwar Al Madinah Mövenpick Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 6.8,
        //       category: "Good",
        //     },
        //     totalPrice: 1657,
        //     price: 629,
        //   },
        // ],
        // 3: [
        //   {
        //     name: "Saja Al Madinah Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.0,
        //       category: "Very Good",
        //     },
        //     totalPrice: 1173,
        //     price: 586,
        //   },
        //   {
        //     name: "Pullman Zamzam Madina",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.2,
        //       category: "Very Good",
        //     },
        //     totalPrice: 1257,
        //     reviews: 1004,
        //     price: 628,
        //   },
        //   {
        //     name: "Intercontinental Madinah - Dar Al Iman, an IHG Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 8.8,
        //       category: "Excellent",
        //     },
        //     totalPrice: 1857,
        //     price: 670,
        //   },
        //   {
        //     name: "Anwar Al Madinah Mövenpick Hotel",
        //     shortDescription: "Madinah City Center",
        //     rating: {
        //       points: 6.8,
        //       category: "Good",
        //     },
        //     totalPrice: 1657,
        //     price: 629,
        //   },
        // ],
      },
    };
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const id = val.params.id;
    
        this.fetchPackages(id);
       
      },
    },
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Packages");
  },
  methods: {
    async fetchPackages(query) {
      this.fetchLoading = true;
      let res = await this.$axios.get("packages");

      this.packages = res.data.data.response.packages;
      this.fetchLoading = false;
    },
  },
};
</script>

<style lang="scss">
.packages {
  .ant-tabs-nav-wrap {
    text-align: center;
  }
  .ant-tabs-tab{
    color: #000 !important;
    &.ant-tabs-tab-active{
      color: #fff !important;
    }
  }
}
</style>
