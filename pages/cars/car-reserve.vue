<template>
  <div class="container">
  <div class="booking-container ">
    <ReserveFrom />
    <a-card>
      <div>
        <div>
          <strong>{{ carDetails.modal }}</strong>
        </div>
        <div>
          <small>{{ carDetails.time }}</small>
        </div>
        <div>
          <span
            class="amenities"
            v-for="(e, i) in carDetails.amenities"
            :key="i"
            ><i :class="e.icon"></i>{{ e.amenity }}</span
          >
        </div>

        <div>
          <b>Pick-up :</b>
          {{ carDetails.pickup }}
        </div>
        <div>
          <b>Drop-off :</b>
          {{ carDetails.dropOff }}
        </div>
        <div>
          <strong>Total : </strong>
          <strong>{{ carDetails.total }} </strong>
        </div>
      </div>
    </a-card>
  </div>
  </div>
</template>

<script>
import ReserveFrom from "@/components/Cars/ReserveForm.vue";

export default {
  name: "BookingContainer",
  components: {
    ReserveFrom,
  },
  data() {
    return {
      carDetails: {
        modal: "Deluxe Room",
        time: "Wed, Aug 7 - Thu, Aug 8",
        amenities: [
          {
            icon: "fa-solid fa-user",
            amenity: "5 Passengers",
          },
          {
            icon: "fa-solid fa-snowflake",
            amenity: "Air Conditioning",
          },
          {
            icon: "fa-solid fa-gauge-high",
            amenity: "622 free miles/day",
          },
        ],
        pickup: "Wed, Aug 7 10:30am",
        dropOff: "Thu, Aug 8 10:30am",
        total: 43242,
      },
    };
  },
  mounted(){
    this.$store.commit("SET_BANNER_TITLE", "Cars");

  },
};
</script>

<style scoped>
.booking-container {
  display: flex;
  justify-content: space-between;
}
.amenities {
  margin-right: 0.5rem;
}
.amenities i {
  margin-right: 0.5rem;
}
</style>
