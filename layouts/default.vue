<template>
  <div>
    <a-layout class="main-layout" :class="{ 'mobile-view': mobileView }">
      <a-layout-header>
        <div class="container">
          <div class="header-wrapper item-v-center">
            <div
              class="col"
              style="font-size: x-large; color: red; font-weight: 900"
            >
              <div class="logo">
                <img
                  src="~/assets/svg/ride2umrah-logo-transparent.png"
                  alt=""
                />
              </div>
            </div>
            <div class="col nav h-100 item-v-center fit-width">
              <ul class="h-100 item-v-center nav-menu">
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
                  <nuxt-link to="/blogs">Blogs</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/faqs">Faqs</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/contact-us">Contact US</nuxt-link>
                </li>
              </ul>
              <div class="actions">
                <a-button
                  @click="$router.push('/reservation-page')"
                  class="add-to-cart"
                  ><i class="fa-solid fa-cart-shopping"></i
                ></a-button>
                <a-button @click="$router.push('auth/login')">Sign In</a-button>
              </div>
            </div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div v-if="bannerTitle">
          <div class="banner">
            <img src="~/static/images/banner1.jpg" alt="" />
            <div class="overlay"></div>
            <div class="banner-content">
              {{ bannerTitle }}
            </div>
          </div>
        </div>
        <div>
          <nuxt />
        </div>
      </a-layout-content>
      <div id="contact-us-fixed-btn">
        <a-button type="primary" @click="handleOpenContactModal"
          >Send Enquiry</a-button
        >
      </div>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
    <contact-modal
      :showContactModal="showContactModal"
      @cancel="handleModalClose"
    />
  </div>
</template>

<script>
import contactModal from "@/components/contact-modal.vue";
import Footer from "@/components/Layouts/Footer.vue";
export default {
  components: {
    contactModal,
    Footer,
  },
  computed: {
    bannerTitle() {
      return this.$store.state.bannerTitle;
    },
  },
  data() {
    return {
      mobileView: false,
      showContactModal: false,
    };
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },

  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 768;
      this.$store.commit("UPDATE_VIEW", this.mobileView);
    },
    handleOpenContactModal() {
      this.showContactModal = true;
    },
    handleModalClose() {
      this.showContactModal = false;
    },
  },
  // beforeDestroy() {
  //   window.removeEventListener("resize", this.handleView);
  // },
};
</script>

<style lang="scss">
.ant-layout-header {
  background-color: var(--theme-secondary-bg-color);
  padding: 0;
  height: auto;
  line-height: auto;

  .header-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .nav,
  .nav-menu {
    display: flex;
    align-items: center;
  }
  .actions {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 17rem;
    img {
      width: 100%;
      aspect-ratio: 15 / 7;
    }
  }

  .container > .row {
    height: 5.5rem;
  }
  .nav-menu {
    list-style: none;
    align-items: center;
    margin: 0;
    margin-right: 7rem;
    width: max-content;
    font-size: small;
    li {
      padding: 1rem;

      a {
        color: #000;
        white-space: nowrap;
        &:hover {
          color: var(--theme-primary-color);
        }
      }
    }
  }
  .add-to-cart {
    margin-right: 1rem;
  }
}
.banner {
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
  img {
    aspect-ratio: 8 / 1;
    object-fit: cover;
    width: 100%;
    display: block;

    // object-position: 0px -43rem;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #7449709d; /* Black color with 50% opacity */
    z-index: 1;
  }

  .banner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 2;
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
  }
}
#contact-us-fixed-btn {
  position: fixed;
  right: -2rem;
  top: 37rem;
  rotate: -90deg;
}
.ant-layout-footer {
  padding-left: 0;
  padding-right: 0;
}
@media (max-width: 768px) {
  .ant-layout-header {
    height: fit-content;
    padding: 1rem 0;
    .header-wrapper,
    .nav {
      display: flex;
      flex-flow: column;
      width: fit-content;
      flex-flow: column-reverse;
      width: 80%;
      margin: auto;
    }
    .nav-menu {
      display: flex;
      padding: 0;
      margin: 0 !important;
    }
    .logo {
      display: none;
    }
    .actions {
      width: 100%;
      justify-content: space-between;
    }
  }
  #contact-us-fixed-btn {
    display: none;
  }
}
</style>
