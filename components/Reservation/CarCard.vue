<template>
  <div>
    <div>
      <div class="car-card">
        <div class="card-content">
          <div class="image-wrapper">
            <img src="~/static/images/car.png" alt="Car Image" />
          </div>
        </div>
      </div>

      <div>
        <div class="card-content">
          <h2>{{ details.type }}</h2>
          <h3>{{ details.model }}</h3>
          <a-row justify="space-between" class="total-price">
            <a-col span="8"><strong>Pickup Date</strong></a-col>
            <a-col span="16">Wed, Aug 7, 10:30am - Thu, Aug 8, 10:30am</a-col>
          </a-row>
          <a-row justify="space-between" class="total-price">
            <a-col span="8"><strong>Pickup & Drop-off Location</strong></a-col>
            <a-col span="16"
              >ISP Airport 150 Arrival Ave Islip Airprt Enterprise Rentca,
              Ronkonkoma, New York, United States 11779</a-col
            >
          </a-row>
          <a-row justify="space-between" class="total-price">
            <a-col span="8"><strong>Total</strong></a-col>
            <a-col span="16"
              ><strong
                >ISP Airport 150 Arrival Ave Islip Airprt Enterprise Rentca,
                Ronkonkoma, New York, United States 11779</strong
              ></a-col
            >
          </a-row>
        </div>
      </div>
    </div>
    <!-- <div>
      <div>
        <span>
          <h2 style="display: inline">$80</h2>
        </span>
        <span>
          <small>per day</small>
        </span>
      </div>
      <div class="price-card">
        <h2>Price Details</h2>
        <p>Pay at Pickup</p>
        <a-row>
          <a-col span="12">Car rental fee x 1 day</a-col>
          <a-col span="12">$34.86</a-col>
        </a-row>
        <a-row>
          <a-col span="12">Taxes and fees</a-col>
          <a-col span="12">included</a-col>
        </a-row>
        <hr />
        <a-row>
          <a-col span="12">Total</a-col>
          <a-col span="12">$34.86</a-col>
        </a-row>
        <a-row>
          <a-col span="12">Pay at pick-up</a-col>
          <a-col span="12">$34.86</a-col>
        </a-row>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    details: Object,
    getLocationName: Function,
    formattedDate: Function,
  },
};
</script>

<style scoped lang="scss">
.card-content {
  .image-wrapper {
    img {
      width: 100%;
      aspect-ratio: 4 / 2;
      object-fit: cover;
    }
  }
}
.ant-row {
  margin: 2rem 0;
}
</style>
