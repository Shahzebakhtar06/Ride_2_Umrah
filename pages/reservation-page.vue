<template>
  <div>
    <div class="container">
      <div class="card-wrapper">
        <div v-for="(item, index) in cartItems" :key="index" class="card">
          <a-card :title="item.type">
            <component :is="getComponentName(item)" :details="item.data"></component>
            <a-button @click="removeFromCart(index)">Remove from Cart</a-button>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarCard from "../components/Reservation/CarCard.vue";
import RoomCard from "../components/Reservation/RoomCard.vue";
import PackageAndVisaCard from "../components/Reservation/PackageAndVisaCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    CarCard,
    RoomCard,
    PackageAndVisaCard,
  },
  computed: {
    ...mapGetters(["cartItems"]),
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    getComponentName({ type }) {
      if (type) {
        let name = type;
        if (name.toLowerCase() == "package" || name.toLowerCase() == "visa") {
          name = "PackageAndVisa";
        }
        return name + "Card";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .card {
    width: 35rem;
    height: 40rem;
    margin: 0.5rem;
  }
}
</style>
