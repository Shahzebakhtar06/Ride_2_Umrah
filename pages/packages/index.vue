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
      activeKey: "1",
      fetchLoading: true,
      packages: {},
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
  .ant-tabs-tab {
    color: #000 !important;
    &.ant-tabs-tab-active {
      color: #fff !important;
    }
  }
}
</style>
