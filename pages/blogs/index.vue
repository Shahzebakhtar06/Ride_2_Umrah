<template>
  <div class="container">
    <div :class="{ loader: fetchLoading }">
      <div class="card-container">
        <div v-for="blog in blogs" :key="blog.id">
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
        </div>
      </div>
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
<style scoped lang="scss">
.mobile-view {
  .car-card {
    height: auto;
    display: inline-flex;
    flex-wrap: wrap;
    width: 50rem;
    margin: 3rem;
    height: auto;
    .card-content {
      flex-direction: column;
      .image-slider-wrapper {
        width: auto;
      }
      .details {
        grid-template-columns: 1fr;
      }
    }
  }
}
.card-container {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  .card {
    border-radius: 20px;
    padding: 2rem;
    width: 50rem;
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
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
