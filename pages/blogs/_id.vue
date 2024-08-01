<template>
  <div class="container">
    <div v-if="blog">
      <a-row>
        <a-col :span="12"
          ><h1>{{ blog.title }}</h1></a-col
        >
        <a-col :span="12">{{ blog.short_description }}</a-col>
      </a-row>
      <div>{{ blog.created_at }}</div>
      <div>
        <img :src="$global.imgBasePath + blog.image" alt="" />
      </div>
      <div v-html="blog.description" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  },
};
</script>

<style></style>
