<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="container">
          <div class="row">
            <div
              class="col"
              style="font-size: x-large; color: red; font-weight: 900"
            >
              <img
                src="~/assets/svg/ride2umrah-logo-transparent.png"
                width="80"
                height="70"
                alt=""
              />
            </div>
            <div class="col fit-width">
              <a-button @click="$router.push('auth/login')">Sign In</a-button>
            </div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="container">
          <nuxt />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer>
        <div class="container">Footer</div>
      </a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss">
.ant-layout-header {
  background-color: var(--theme-secondary-bg-color);
  padding: 0;
}
.ant-layout-footer {
  padding-left: 0;
  padding-right: 0;
}
</style>
