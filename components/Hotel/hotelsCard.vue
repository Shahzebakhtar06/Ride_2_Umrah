<template>
  <div class="hotel-card">
    <div class="card-content">
      <div class="image-slider-wrapper">
        <a-carousel arrows class="image-slider">
          <div
            slot="prevArrow"
            class="custom-slick-arrow"
            style="left: 10px; z-index: 1"
          >
            <a-icon type="left-circle" />
          </div>
          <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
            <a-icon type="right-circle" />
          </div>
          <div>
            <img src="https://via.placeholder.com/600x400" alt="Hotel Image" />
          </div>
          <div>
            <img src="https://via.placeholder.com/600x400" alt="Hotel Image" />
          </div>
        </a-carousel>
      </div>
      <div class="details" @click="goToHotelDetails">
        <div>
          <div class="card-title">
            {{ details.hotel_name }}
          </div>
          <p>
            Islamabad
            {{ details.city_name }}
          </p>
          <p v-if="details.guest_liked">
            <i class="fa-solid fa-thumbs-up"></i> Guests liked: Friendly staff
          </p>
          <div>
            <a class="reserve-now text-success" href="#"
              >Reserve now, pay later</a
            >
            <div class="rating row">
              <div class="rate col fit-width">
                {{ details.rating.points }}
              </div>
              <div class="col px-1">
                <div>
                  <b>{{ details.rating.category }}</b>
                </div>
                <div>{{ details.rating.reviews }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="reserve-details">
          <div class="price-info">
            <div class="availability bg-success" v-if="details.available > 0">
              We have {{ details.available }} left at
            </div>
            <span class="price">$201 {{ details.price }}</span>
            <span class="total-price">
              ${{ details.total_price }} total <br />includes taxes & fees</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelCard",
  props: { details: Object },
  methods: {
    goToHotelDetails() {
      this.$router.push("/hotels/" + 1);
    },
  },
};
</script>

<style scoped lang="scss">
.hotel-card {
  width: 100rem;
  margin: auto;
  margin-top: 2rem;
  padding: 0;

  border: none;
  .card-content {
    background: #fff;
    display: flex;
    flex-direction: row;
    border: 1px solid var(--theme-border-color);
    border-radius: 1.5rem;
    overflow: hidden;
    .card-title {
      font-size: 2.4rem;
      font-weight: 800;
    }
    .image-slider-wrapper {
      width: 27rem;

      .ant-carousel .custom-slick-arrow {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
        opacity: 0.3;
      }
      .ant-carousel .custom-slick-arrow:before {
        display: none;
      }
      .ant-carousel .custom-slick-arrow:hover {
        opacity: 0.5;
      }
    }
    .details {
      padding: 1rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 0.3fr;
      gap: 10px;

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
      .reserve-details {
        max-width: fit-content;
        margin-left: auto;
        margin-top: auto;
      }
    }
  }
}

.image-slider {
  width: 100%;
  height: 100%;
}

.image-slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details h3 {
  margin: 0;
  font-size: 20px;
}

.details p {
  margin: 5px 0;
}

.reserve-now {
  margin: 10px 0;
  display: block;
}

.price-info {
  margin: 10px 0;
  text-align: end;
}

.price {
  font-size: 24px;
  font-weight: bold;
  /* color: #52c41a; */
}

.total-price {
  display: block;
  color: gray;
}

.availability {
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  margin-left: auto;
}
</style>
