<template>
  <div class="container">
  <div class="hotel-page">
    <div class="hotel-header">
      <div class="hotel-images">
        <div class="feature-image">
          <img :src="featureImage" alt="Feature Image" />
        </div>
        <div class="other-images">
          <img v-for="i in 4" :key="i" :src="otherImages[i]" alt="Image" />
          <button
            v-if="otherImages.length > 4"
            class="more-images-btn"
            @click="showModal = true"
          >
            <i class="fa-regular fa-images"></i> {{ otherImages.length - 4 }}
            <i class="fa-regular fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="hotel-details">
      <div class="hotel-info">
        <h1>{{ hotel.name }}</h1>
        <div class="hotel-rating">★★★★★</div>
        <p>{{ hotel.description }}</p>
        <div class="rating row">
          <div class="rate col fit-width">
            {{ hotel.points }}
          </div>
          <div class="col px-1">
            <div>
              <b>{{ hotel.rating_category }}</b>
            </div>
          </div>
        </div>
        <a-button  @click="goToPackageReserve()" style="margin: 2rem 0;" type="primary" shape="round">Reserve</a-button>
      </div>
    </div>

    <a-modal
      v-model="showModal"
      title="Hotel Images"
      width="80rem"
      :footer="null"
    >
      <a-carousel>
        <div v-for="(image, index) in allImages" :key="index">
          <img :src="image" alt="Image" class="carousel-image" />
        </div>
      </a-carousel>
    </a-modal>
  </div>
  </div>
</template>
<script>
import RoomCard from "@/components/Hotel/RoomCard.vue";
export default {
  name: "HotelPage",
  components: {
    RoomCard,
  },
  computed: {
    allImages() {
      return [...this.featureImage, ...this.otherImages];
    },
  },
  data() {
    return {
      showModal: false,
      featureImage: require("~/static/images/feature-image.avif"),
      otherImages: [
        require("~/static/images/1.avif"),
        require("~/static/images/2.avif"),
        require("~/static/images/3.avif"),
        require("~/static/images/4.avif"),
        require("~/static/images/5.avif"),
        require("~/static/images/6.avif"),
        require("~/static/images/7.avif"),
      ],

      mapImage: "/path/to/map-image.jpg",
      hotel: {
        name: "Islamabad Serena Hotel",

        rating_category: "Excellent",
        description: "Luxury hotel with 5 restaurants and a full-service spa",
        points: 8.6,
        guestsLiked: ["Friendly staff"],
        amenities: [
          { icon: "fas fa-utensils", name: "Breakfast included" },
          { icon: "fas fa-snowflake", name: "Air conditioning" },
          { icon: "fas fa-spa", name: "Spa" },
          { icon: "fas fa-swimming-pool", name: "Pool" },
          { icon: "fas fa-wifi", name: "Free WiFi" },
          { icon: "fas fa-parking", name: "Parking included" },
        ],
        location:
          "Khayaban-e-Suharwardy G-5/1, Islamabad, Federal Capital Territory, 44000",

        rooms: [
          {
            image: "path/to/image1.jpg",
            imageCount: 4,
            title: "Deluxe Room, 2 Twin Beds",
            rating: "8.5/10 Very Good",
            amenities: [
              { icon: "fas fa-utensils", name: "Breakfast included" },
              { icon: "fas fa-snowflake", name: "Air conditioning" },
              { icon: "fas fa-spa", name: "Spa" },
              { icon: "fas fa-swimming-pool", name: "Pool" },
              { icon: "fas fa-wifi", name: "Free WiFi" },
              { icon: "fas fa-parking", name: "Parking included" },
            ],
            refundable: "Fully refundable Before Wed, Jul 24",
            price: "$219",
            total: "$267 total includes taxes & fees",
            availability: "We have 5 left",
            buttonText: "Reserve",
          },
          {
            image: "path/to/image2.jpg",
            imageCount: 5,
            title: "King Suite, 1 King Bed",
            rating: "9.0/10 Excellent",
            amenities: [
              { icon: "fas fa-utensils", name: "Breakfast included" },
              { icon: "fas fa-snowflake", name: "Air conditioning" },
              { icon: "fas fa-spa", name: "Spa" },
              { icon: "fas fa-swimming-pool", name: "Pool" },
              { icon: "fas fa-wifi", name: "Free WiFi" },
              { icon: "fas fa-parking", name: "Parking included" },
            ],
            refundable: "Fully refundable Before Fri, Jul 26",
            price: "$299",
            total: "$365 total includes taxes & fees",
            availability: "Only 2 left",
            buttonText: "Reserve",
          },
          {
            image: "path/to/image3.jpg",
            imageCount: 6,
            title: "Standard Room, 1 Queen Bed",
            rating: "8.0/10 Good",
            amenities: [
              { icon: "fas fa-utensils", name: "Breakfast included" },
              { icon: "fas fa-snowflake", name: "Air conditioning" },
              { icon: "fas fa-spa", name: "Spa" },
              { icon: "fas fa-swimming-pool", name: "Pool" },
              { icon: "fas fa-wifi", name: "Free WiFi" },
              { icon: "fas fa-parking", name: "Parking included" },
            ],
            refundable: "Fully refundable Before Mon, Jul 29",
            price: "$150",
            total: "$180 total includes taxes & fees",
            availability: "Only 3 left",
            buttonText: "Reserve",
          },
          {
            image: "path/to/image4.jpg",
            imageCount: 3,
            title: "Family Room, 2 Double Beds",
            rating: "8.7/10 Very Good",
            amenities: [
              { icon: "fas fa-utensils", name: "Breakfast included" },
              { icon: "fas fa-snowflake", name: "Air conditioning" },
              { icon: "fas fa-spa", name: "Spa" },
              { icon: "fas fa-swimming-pool", name: "Pool" },
              { icon: "fas fa-wifi", name: "Free WiFi" },
              { icon: "fas fa-parking", name: "Parking included" },
            ],
            refundable: "Fully refundable Before Tue, Jul 23",
            price: "$250",
            total: "$300 total includes taxes & fees",
            availability: "We have 4 left",
            buttonText: "Reserve",
          },
          {
            image: "path/to/image5.jpg",
            imageCount: 8,
            title: "Executive Suite, 1 King Bed",
            rating: "9.5/10 Exceptional",
            amenities: [
              { icon: "fas fa-utensils", name: "Breakfast included" },
              { icon: "fas fa-snowflake", name: "Air conditioning" },
              { icon: "fas fa-spa", name: "Spa" },
              { icon: "fas fa-swimming-pool", name: "Pool" },
              { icon: "fas fa-wifi", name: "Free WiFi" },
              { icon: "fas fa-parking", name: "Parking included" },
            ],
            refundable: "Fully refundable Before Thu, Jul 25",
            price: "$350",
            total: "$420 total includes taxes & fees",
            availability: "Only 1 left",
            buttonText: "Reserve",
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.commit("SET_BANNER_TITLE", "Packages");
  },
  methods:{
    goToPackageReserve(){
      this.$router.push('/packages/package-reserve')
    }
  }
};
</script>

<style lang="scss" scoped>
.hotel-page {
  padding: 2rem;
  .hotel-header {
    margin-bottom: 2rem;

    .hotel-images {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-right: 2rem;
      max-height: 28rem;

      .feature-image {
        img {
          max-height: 28rem;
          width: 100%;

          margin-bottom: 0.5rem;
        }
      }

      .other-images {
        margin-left: 0.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 0.5rem;
        position: relative;
        column-gap: 0.5rem;
        max-height: 28rem;
        img {
          width: 100%;
          object-fit: cover;
          max-height: 13.8rem;
          margin: 0;
        }
      }

      .more-images-btn {
        display: block;
        position: absolute;
        right: 1rem;
        bottom: 0.5rem;
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
        color: #fff;
        font-size: 1.5rem;
        background: #00000091;
        border-radius: 5rem;

        i {
          margin-right: 0.5rem;
        }

        &:hover {
          background: #000000c4;
        }
      }
    }

    .hotel-info {
      flex: 1;

      h1 {
        margin: 0;
      }

      .hotel-rating {
        font-size: 2.4rem;
        color: #ffb700;
        margin-bottom: 1rem;
      }

      .hotel-score {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        .score {
          font-size: 2.4rem;
          font-weight: bold;
          margin-right: 1rem;
        }

        .score-label {
          font-size: 1.6rem;
        }
      }

      .view-reviews {
        display: inline-block;
        color: #007bff;
        text-decoration: none;
        margin-bottom: 2rem;
      }
    }
  }

  .hotel-details {
    gap: 2rem;
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
    .hotel-amenities {
      margin-top: 2rem;
      width: 60rem;
      h2 {
        font-weight: 600;
        font-size: 1.9rem;
      }

      ul {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 1rem;
        li {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          i {
            font-size: 2rem;
            margin-right: 1rem;
          }
        }
      }

      .view-all-amenities {
        display: inline-block;
        color: #007bff;
        text-decoration: none;
      }
    }

    .hotel-location {
      flex: 1;

      h2 {
        margin: 0;
      }

      .hotel-map {
        width: 100%;
        height: auto;
        margin-bottom: 1rem;
      }

      .nearby-locations {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;

          i {
            font-size: 1.6rem;
            margin-right: 1rem;
          }

          .distance {
            margin-left: auto;
          }
        }
      }

      .view-map,
      .view-more {
        display: inline-block;
        color: #007bff;
        text-decoration: none;
        margin-bottom: 1rem;
      }
    }
  }

  .hotel-navigation {
    margin-top: 2rem;

    ul {
      list-style: none;
      display: flex;
      gap: 1rem;
      padding: 0;

      li {
        a {
          color: #007bff;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .rooms {
    display: flex;
    flex-wrap: wrap;
  }
  .carousel-image {
    width: 100%;
    height: auto;
  }
}
</style>
