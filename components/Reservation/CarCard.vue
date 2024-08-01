<template>
  <div>
    <div>
      <div class="car-card">
        <a-card>
          <div class="card-content">
            <div class="details">
              <div class="great-deal">Great Deal</div>

              <!-- <div class="card-title">{{ details.type }}</div>
              <p>{{ details.model }}</p> -->

              <!-- <ul class="car-amenities">
                <li v-for="(amenity, index) in car.amenities" :key="index">
                  <i :class="amenity.icon"></i> {{ amenity.amenity }}
                </li>
              </ul> -->
            </div>
            <div class="image-slider-wrapper">
              <img src="~/static/images/car.png" alt="Car Image" />
            </div>
          </div>
        </a-card>
      </div>
      <div class="rental-Location">
        <a-card>
          <div class="card-content">
            <h2>Car rental location</h2>
            <strong>Pickup & Drop-off</strong>
            <div>
              <span></span>
              <span>Wed, Aug 7, 10:30am - Thu, Aug 8, 10:30am</span>
            </div>
            <div>
              <span></span>
              <span
                >ISP Airport 150 Arrival Ave Islip Airprt Enterprise Rentca,
                Ronkonkoma, New York, United States 11779</span
              >
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div>
      <a-card>
        <span>
          <h2 style="display: inline">$80</h2>
        </span>
        <span>
          <small>per day</small>
        </span>
      </a-card>
      <a-card class="price-card">
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
      </a-card>
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

<style></style>
