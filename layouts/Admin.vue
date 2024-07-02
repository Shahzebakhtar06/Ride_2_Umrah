<template>
  <a-layout id="admin-layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <i class="fa-solid fa-hotel"></i>
          <span>Hotels</span>
        </a-menu-item>
        <a-menu-item key="2">
          <i class="fa-solid fa-bed"></i>
          <span>Rooms</span>
        </a-menu-item>
        <a-menu-item key="3">
          <i class="fa-solid fa-location-dot"></i>
          <span>Location</span>
        </a-menu-item>
        <a-menu-item key="4">
          <i class="fa-solid fa-car-side"></i>
          <span>Cars</span>
        </a-menu-item>
        <a-menu-item key="5">
          <i class="fa-solid fa-building-circle-check"></i>
          <span>Amenities</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="row">
          <div class="col">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
          </div>
          <div class="col fit-width">
            <a-button type="primary" @click="handleLogout()"> logout </a-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
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
          window.location.href = "auth/login";
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
}

//   #components-layout-demo-custom-trigger .trigger:hover {
//     color: #1890ff;
//   }

//   #components-layout-demo-custom-trigger .logo {
//     height: 32px;
//     background:var(--theme-primary-bg-color);
//     margin: 16px;
//   }
</style>
