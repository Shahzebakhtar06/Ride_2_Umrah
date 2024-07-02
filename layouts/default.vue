<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="container">
          <div class="row">
            <div class="col">
              <img
                src="https://www.expedia.com/_dms/header/logo.svg?locale=en_US&amp;siteid=1&amp;2&amp;6f9ec7db"
                alt="Expedia logo"
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
      <a-layout-footer>
        <div class="container">Footer</div>
      </a-layout-footer>
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
