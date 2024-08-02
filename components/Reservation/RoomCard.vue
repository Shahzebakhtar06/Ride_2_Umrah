<template>
  <div class="room-details">
    <div>
      <div class="featured-image">
        <img :src="$global.imgBasePath + details.images[0].name" alt="" />
      </div>
      <div class="hotel-info">
        <h3>I{{ details.name }}</h3>
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
          <a-col span="10"
            ><strong>{{ details.rooms.length }} Rooms</strong></a-col
          >
          <a-col span="10"
            >{{ totalsPeople.children }} children and
            {{ totalsPeople.adults }} Adult {{ totalNights }} Nights</a-col
          >
        </a-row>
        <a-row justify="space-between">
          <a-col span="10"><strong>Rooms Price</strong></a-col>
          <a-col span="10">{{ details.price }} per night</a-col>
        </a-row>
      </div>

      <a-row justify="space-between" class="total-price">
        <a-col span="10"><strong>Grand Total</strong></a-col>
        <a-col span="10"
          ><strong>{{ grandTotal }}</strong></a-col
        >
      </a-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "details",
  props: {
    details: {
      type: Object,
    },
    getLocationName: Function,
    formattedDate: Function,
  },
  computed: {
    totalsPeople() {
      return this.details.rooms.reduce(
        (acc, item) => {
          acc.adults += item.adults;
          acc.children += item.children;
          return acc;
        },
        { adults: 0, children: 0 }
      );
    },
    totalNights() {
      const startDate = moment(this.details.dates[0]);
      const endDate = moment(this.details.dates[1]);

      // Calculate the difference in days
      const daysDifference = endDate.diff(startDate, "days");
      return daysDifference;
    },
    grandTotal() {
      return this.details.price * this.totalNights;
    },
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
      text-shadow: 1px -1px 10px #080808;
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
