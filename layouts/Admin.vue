<template>
  <a-layout id="admin-layout">
    <a-layout-sider>
      <a-menu theme="dark" mode="inline" v-model="selectedKey">
        <a-menu-item key="admin-hotels">
          <nuxt-link :to="{ name: 'admin-hotels' }">
            <i class="fa-solid fa-hotel"></i>
            <span>Hotels</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-rooms">
          <nuxt-link :to="{ name: 'admin-rooms' }">
            <i class="fa-solid fa-bed"></i>
            <span>Rooms</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-location">
          <nuxt-link :to="{ name: 'admin-cities' }">
            <i class="fa-solid fa-location-dot"></i>
            <span>Cities</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-cars">
          <nuxt-link :to="{ name: 'admin-cars' }">
            <i class="fa-solid fa-car-side"></i>
            <span>Cars</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-amenities">
          <nuxt-link :to="{ name: 'admin-amenities' }">
            <i class="fa-solid fa-building-circle-check"></i>
            <span>Amenities</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-addons">
          <nuxt-link :to="{ name: 'admin-addons' }">
            <i class="fa-solid fa-building-circle-check"></i>
            <span>Addons</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-packages">
          <nuxt-link :to="{ name: 'admin-packages' }">
            <i class="fa-solid fa-box-open"></i>
            <span>Packages</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-visas">
          <nuxt-link :to="{ name: 'admin-visas' }">
            <i class="fa-brands fa-cc-visa"></i>
            <span>Visas</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-fares">
          <nuxt-link :to="{ name: 'admin-fares' }">
            <i class="fa-solid fa-comment-dollar"></i>
            <span>Fares</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="row nav-bar">
          <div class="col">
            <!-- <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            /> -->
            <img
              src="~/assets/svg/ride2umrah-logo-transparent.png"
              width="100px"
              height="80px"
              alt=""
            />
          </div>
          <div class="col fit-width">
            <a-button type="primary" @click="handleLogout()"> Logout </a-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  layout: "Admin",
  data() {
    return {
      collapsed: false,
      selectedKey: ["admin-hotels"],
    };
  },
  mounted() {
    this.selectedKey = [this.$route.name];
  },
  methods: {
    handleLogout() {
      this.$confirm({
        title: "Are you sure you want to log out?",
        icon: "exclamation-circle",
        okText: "Yes",
        cancelText: "No",
        cancelButtonProps: {
          class: "ant-btn-link",
        },
        okType: "primary",
        onOk: async () => {
          await this.$auth.logout();
          window.location.replace("auth/login");
        },
      });
    },
  },
};
</script>
<style lang="scss">
#admin-layout {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .ant-layout-header {
    height: auto !important;
    .nav-bar {
      padding: 0.5rem;
      align-items: center;
      padding-right: 0.9rem;
    }
  }
  .ant-layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff !important;
    min-height: 100%;
  }
}
</style>
