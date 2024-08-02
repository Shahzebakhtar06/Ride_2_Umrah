<template>
  <div class="package-and-visa">
    <div class="featured-image">
      <img :src="$global.imgBasePath + details.images[0].name" alt="" />
    </div>
    <div class="hotel-info">
      <h3>I{{ details.name }}</h3>
    </div>
    <div class="rating">
      <div class="rate">
        {{ details.rating }}
      </div>
    </div>
    <div class="room-info">
      <a-row justify="space-between">
        <a-col span="10"><strong>Short Description</strong></a-col>
        <a-col span="10">{{ details.short_description }}</a-col>
      </a-row>
      <a-row justify="space-between">
        <a-col span="10"><strong>Price</strong></a-col>
        <a-col span="10">{{ details.price }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: Object,
  },
};
</script>

<style scoped lang="scss">
.package-and-visa {
  .hotel-info {
    margin: 1rem 0rem;
    font-weight: 800;
    font-size: large;
  }
  .featured-image {
    img {
      width: 100%;
      aspect-ratio: 4 / 2;
      object-fit: cover;
    }
  }
  .rating {
    display: flex;
    align-items: center;
    margin: 1rem 0;

    .rate {
      background: var(--theme-success-color);
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }
  }
}
</style>
