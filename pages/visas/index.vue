<template>
  <div class="container">
    <div :class="{ loader: fetchLoading }">
      <div v-if="visas.length">
        <a-row :gutter="[16]">
          <a-col
            :span="18"
            :md="8"
            :lg="8"
            v-for="visa in visas"
            :key="visa.id"
          >
            <div class="card">
              <div class="images-wrapper">
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
                      alt="room Image"
                    />
                  </div>
                </a-carousel>
              </div>
              <div class="card-body">
                <h3>{{ visa.name }}</h3>

                <p>
                  {{ visa.short_description }}
                </p>
              </div>
              <a-row>
                <a-col :span="16">
                  <strong>Price</strong>
                </a-col>
                <a-col :span="8">
                  <strong>{{ price }}</strong>
                </a-col>
              </a-row>
              <div class="card-footer">
                <a-button type="primary" @click="goToVisaDetail(visa.id)"
                  >Read More</a-button
                >
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visas: [],
      fetchLoading: true,
    };
  },
  mounted() {
    this.fetchVisas();
    this.$store.commit("SET_BANNER_TITLE", "Visas");
  },
  methods: {
    goToVisaDetail(id) {
      this.$router.push("/visas/" + id);
    },
    async fetchVisas() {
      this.fetchLoading = true;
      let res = await this.$axios.get("visas");

      this.visas = res.data.data.response.visas;
      this.fetchLoading = false;
    },
  },
};
</script>
<style scoped lang="scss">
.card {
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  background-color: white;
  margin: 1rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
}
.card-body {
  display: flex;
  flex-direction: column;
}
.card-footer {
  display: flex;
  justify-content: end;
  padding-top: 15px;
  margin-top: auto;
}
.images-wrapper {
  width: 100%;

  img {
    width: 100%;
    aspect-ratio: 6 / 4;
    object-fit: cover;
    border-radius: 1rem;
  }
  .ant-carousel .custom-slick-arrow {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2.5rem;
    color: #fff;
    background-color: var(--theme-primary-color);
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
</style>
