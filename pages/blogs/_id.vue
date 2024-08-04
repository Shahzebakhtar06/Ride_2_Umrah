<template>
  <div class="container">
    <div class="single-blog-details">
      <div v-if="blog">
        <a-row>
          <a-col :span="12"
            ><h1>{{ blog.title }}</h1></a-col
          >
          <a-col :span="12">{{ blog.short_description }}</a-col>
        </a-row>
        <div>{{ blog.created_at }}</div>
        <div class="card-image">
          <img :src="$global.imgBasePath + blog.image" alt="" />
        </div>
        <div v-html="blog.description" />
        <div class="reserve-btn">
          <a-button
            style="width: 100%; margin: 1rem 0"
            type="primary"
            shape="round"
            :loading="reserveBtnLoading"
            @click="reserveVisa(visa)"
          >
            Reserve</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reserveBtnLoading:false,
      blog: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const id = val.params.id;
        this.fetchSingleBlogDetails(id);
      },
    },
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Blogs");
  },
  methods: {
    async fetchSingleBlogDetails(id) {
      let res = await this.$axios.get("blogs/single/" + id);
      console.log(res, res.data.data.response.data);
      this.blog = res.data.data.response.blog;
    },
    reserveVisa(details) {
      this.reserveBtnLoading = true;
      setTimeout(() => {
        this.addToCart({
          cartType: "Blog",
          ...details,
        });
        this.$notification.success({ message: "AddToCart successfully" });
        this.reserveBtnLoading = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
.single-blog-details {
  .card-image {
    margin: 3rem 1rem;
    img {
      width: 100%;
    }
  }
}
</style>
