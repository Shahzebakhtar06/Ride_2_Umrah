<template>
    <div class="room-details">
      <div class="hotel-info">
        <h3>Islamabad Marriott Hotel</h3>
        <div class="rating">
          <span class="rating-score">{{ roomDetails.rating }}</span>
          <span class="rating-text">Very good</span>
          <span class="rating-count">({{ roomDetails.reviewsCount }} reviews)</span>
        </div>
      </div>
      <div class="room-info">
        <p>
          <strong>1 Room:</strong>
          {{ roomDetails.roomType }}, {{ roomDetails.beds }}
        </p>
        <p>
          <strong>Check-in:</strong> {{ roomDetails.checkInDate }}
        </p>
        <p>
          <strong>Check-out:</strong> {{ roomDetails.checkOutDate }}
        </p>
        <p>
          <strong>1-night stay</strong>
        </p>
      </div>
      <div class="special-requests">
        <button>Special/Accessibility requests (optional)</button>
      </div>
      <div class="booking-cta">
        <button>You have good taste! Book now before someone else grabs it!</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RoomDetails',
    props: {
      roomDetails: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .room-details {
    width: 50%;
    padding: 20px;
  }
  
  .hotel-info {
    margin-bottom: 20px;
  }
  
  .hotel-info h3 {
    margin-bottom: 5px;
  }
  
  .rating {
    display: flex;
    align-items: center;
  }
  
  .rating-score {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .room-info {
    margin-bottom: 20px;
  }
  
  .special-requests {
    margin-bottom: 20px;
  }
  
  .booking-cta {
    text-align: center;
  }
  
  .booking-cta button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>