<template>
  <div class="room-details">
    <div>
      <div class="featured-image">
        <img src="/images/feature-image.avif" alt="" />
      </div>
      <div class="hotel-info">
        <h3>Islamabad Marriott Hotel</h3>
        <div class="rating row">
          <div class="rate col fit-width">
            <!-- {{ details.rating.points }} -->
            8.3
          </div>
          <div class="col px-1">
            <div>
              <b>Good</b>
              <!-- <b>{{ details.rating.category }}</b> -->
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="room-info">
        <p>
          <strong>1 Room:</strong>
          {{ details.roomType }}, {{ details.beds }}
        </p>
        <p><strong>Check-in:</strong> {{ details.checkInDate }}</p>
        <p><strong>Check-out:</strong> {{ details.checkOutDate }}</p>
        <p>
          <strong>1-night stay</strong>
        </p>
      </div> -->
    </div>
    <div title="Price details" class="price-details">
      <a-row justify="space-between" class="price-row">
        <a-col span="16">1 room x 2 nights</a-col>
        <a-col span="8">$544.14</a-col>
      </a-row>
      <a-row justify="start" class="price-row">
        <a-col span="16">$272.07 average per night</a-col>
      </a-row>
      <a-row justify="space-between" class="price-row">
        <a-col span="16">
          Taxes and fees
          <a-tooltip title="Includes service fees and other charges">
            <a-icon type="info-circle" />
          </a-tooltip>
        </a-col>
        <a-col span="8">$118.62</a-col>
      </a-row>
      <a-row justify="space-between" class="total-row">
        <a-col span="16">Total</a-col>
        <a-col span="8">$662.76</a-col>
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
  },
};
</script>
<style lang="scss" scoped>
.room-details {
  width: 100%;
  .price-details {
    margin-top: 0.5rem;
  }
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

  .rating {
    display: flex;
    align-items: center;
  }

  .rating-score {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .room-info {
    margin-bottom: 2rem;
  }

  .special-requests {
    margin-bottom: 2rem;
  }

  .booking-cta {
    text-align: center;

    button {
      background-color: #4caf50;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
    }
  }

  .price-row {
    margin: 1rem 0;
  }

  .total-row {
    font-weight: bold;
    margin: 2rem 0 1rem 0;
  }

  .promo-link {
    display: block;
    margin: 1rem 0;
    color: #1890ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .disclaimer {
    font-size: 0.8em;
    color: #666;
  }
}
</style>
