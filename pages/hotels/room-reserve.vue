<template>
  <div class="booking-container">
    <ReserveFrom :roomDetails="roomDetails" />
    <ReserveRoomCard :roomDetails="roomDetails" />
  </div>
</template>

<script>
import ReserveFrom from "@/components/Hotel/ReserveForm.vue";
import ReserveRoomCard from "@/components/Hotel/ReserveRoomCard.vue";

export default {
  name: "BookingContainer",
  components: {
    ReserveFrom,
    ReserveRoomCard,
  },
  data() {
    return {
      roomDetails: {
        roomType: "Deluxe Room",
        beds: "2 Twin Beds",
        smoking: true,
        breakfastIncluded: true,
        freeParking: true,
        freeWifi: true,
        checkInDate: "Tue, Jul 30",
        checkOutDate: "Wed, Jul 31",
        nightStay: 1,
        rating: 8.4,
        reviewsCount: 221,
      },
    };
  },
};
</script>

<style scoped>
.booking-container {
  display: flex;
  justify-content: space-between;
}
</style>
