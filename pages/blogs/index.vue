<template>
  <div class="container">
    <div :class="{ loader: fetchLoading }">
      <a-row>
        <a-col :span="8" v-for="blog in blogs" :key="blog.id">
          <div class="card">
            <img :src="$global.imgBasePath + blog.image" alt="my image" />
            <div class="card-body">
              <h3>{{ blog.title }}</h3>
              <h5>{{ blog.created_at }}</h5>
              <p>
                {{ blog.short_description }}
              </p>
            </div>
            <div class="card-footer">
              <a-button type="primary" @click="goToBlogDetail(blog.id)"
                >Read More</a-button
              >
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs: [],
      fetchLoading: true,
    };
  },
  mounted() {
    this.fetchBlogs();
    this.$store.commit("SET_BANNER_TITLE", "Blogs");
  },
  methods: {
    goToBlogDetail(id) {
      this.$router.push("/blogs/" + id);
    },
    async fetchBlogs() {
      this.fetchLoading = true;
      let res = await this.$axios.get("blogs");

      this.blogs = res.data.data.response.data;
      this.fetchLoading = false;
    },
  },
};
</script>
<style scoped>
.card {
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  background-color: white;
  margin: 20px 0;
}
.card img {
  width: 100%;
  aspect-ratio: 6 / 4;
  object-fit: cover;
}
.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-footer {
  display: flex;
  justify-content: end;
  padding-top: 15px;
}
</style>
