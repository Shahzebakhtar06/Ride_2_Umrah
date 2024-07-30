<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="container">
          <div class="row item-v-center">
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
            <div class="col row h-100 item-v-center fit-width">
              <ul class="row h-100 item-v-center nav-menu">
                <li>
                  <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/About">About</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/packages">Packages</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/contact-us">Contact US</nuxt-link>
                </li>
              </ul>
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
  height: 5.5rem;
  .container > .row {
    height: 5.5rem;
  }
  .nav-menu {
    list-style: none;
    align-items: center;
    margin: 0;
    margin-right: 7rem;
    font-size: small;
    li {
      padding: 1rem;
      a {
        color: #000;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
.ant-layout-footer {
  padding-left: 0;
  padding-right: 0;
}
</style>
