<template>
  <div class="room-details">
    <div>
      <div class="featured-image">
        <img src="/images/feature-image.avif" alt="" />
      </div>
      <div class="hotel-info">
        <h3>Islamabad Marriott Hotel</h3>
        <div class="rating">
          <div class="rate fit-width">
            {{ details.rating }}
          </div>
        </div>
      </div>
      <div class="room-info">
        <a-row
          justify="space-between"
          v-if="details.dates?.length && details.dates[0]"
        >
          <a-col span="10"><strong>Check-in Date</strong></a-col>
          <a-col span="10">{{ formattedDate(details.dates[0]) }}</a-col>
        </a-row>
        <a-row
          justify="space-between"
          v-if="details.dates?.length && details.dates[1]"
        >
          <a-col span="10"><strong>Check-out Date</strong></a-col>
          <a-col span="10">{{ formattedDate(details.dates[1]) }}</a-col>
        </a-row>
        <a-row justify="space-between">
          <a-col span="10"><strong>Location</strong></a-col>
          <a-col span="10">{{ getLocationName(details.location) }}</a-col>
        </a-row>
        <a-row justify="space-between">
          <a-col span="10"><strong>{{ details.rooms.length }} Rooms</strong></a-col>
          <a-col span="10">4 children and 4 Adult 3 x Night</a-col>
        </a-row>
        <a-row justify="space-between">
          <a-col span="10"><strong>Rooms Price</strong></a-col>
          <a-col span="10">{{ details.price }} per night</a-col>
        </a-row>
      </div>

      <a-row justify="space-between" class="total-price">
        <a-col span="10"><strong>Total</strong></a-col>
        <a-col span="10"><strong>$662.76</strong></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "details",
  props: {
    details: {
      type: Object,
    },
    getLocationName: Function,
    formattedDate:Function
  },

};
</script>
<style lang="scss" scoped>
.room-details {
  width: 100%;
  .featured-image {
    img {
      width: 100%;
      aspect-ratio: 4 / 2;
      object-fit: cover;
    }
  }
  .hotel-info {
    margin-bottom: 0.5rem;

    h3 {
      margin-top: -2.7rem;
      color: #fff;
      font-weight: 500;
      padding: 0 0.5rem;
      margin-bottom: 2rem;
    }

    .rating {
      display: flex;
      align-items: center;

      .rate {
        background: var(--theme-success-color);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
      }
    }
  }
  .total-price {
    margin: 1rem 0rem;
  }
  .ant-row {
    margin: 2rem 0;
  }
}
</style>
