<template>
  <div class="container">
    <div v-if="visa" class="package-details">
      <a-row>
        <a-col :span="12"
          ><h1>{{ visa.name }}</h1></a-col
        >
        <a-col :span="12">{{ visa.short_description }}</a-col>
      </a-row>
      <div>
        <div class="image-slider-wrapper">
          <a-carousel arrows class="image-slider">
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 1rem; z-index: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div
              slot="nextArrow"
              class="custom-slick-arrow"
              style="right: 1rem"
            >
              <a-icon type="right-circle" />
            </div>
            <div v-for="(img, index) in visa.images" :key="index">
              <img
                :src="$global.imgBasePath + img.name"
                class="carousel-image"
                alt="Hotel Image"
              />
            </div>
          </a-carousel>
        </div>
      </div>
      <div v-html="visa.description" />
      <div class="reserve-btn">
        <a-button
          style="width: 100%; margin: 1rem 0"
          type="primary"
          shape="round"
          :loading="reserveBtnLoading"
          @click="reservePackage(visa)"
        >
          Reserve</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions} from "vuex";

export default {
  data() {
    return {
      reserveBtnLoading:false,
      visa: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const id = val.params.id;
        this.fetchSingleVisa(id);
      },
    },
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Package");
  },
  methods: {
    ...mapActions(["addToCart"]),
    async fetchSingleVisa(id) {
      let res = await this.$axios.get("visas/" + id);
      this.visa = res.data.data.response.visa;
    },
    reservePackage(details) {
      this.reserveBtnLoading = true;
      setTimeout(() => {
        this.addToCart({
          cartType: "Package",
          ...details,
        });
        this.$notification.success({ message: "AddToCart successfully" });
        this.reserveBtnLoading = false;
      }, 2000);
    },
  },
};
</script>

<style scoped lang="scss">
.package-details{

.image-slider-wrapper {
  display: block;
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ant-carousel .custom-slick-arrow {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2.5rem;
    color: #fff;
    background-color: rgb(31 45 61 / 77%);
    opacity: 0.5;
    border-radius: 50%;
  }
  .ant-carousel .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel .custom-slick-arrow:hover {
    opacity: 0.5;
  }
}
.reserve-btn{
margin: 2rem 0rem;
}
}

</style>
