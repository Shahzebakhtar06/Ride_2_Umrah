<template>
  <div class="container">
    <div class="images">
      <img
        src="https://i.imgur.com/Z6eU23I.png"
        alt="Best Western Premier Islamabad"
      />
    </div>

    <div class="info">
      <h1> {{details.title}} Best Western Premier Islamabad</h1>
      <p>Islamabad {{ details.city }} </p>
      <p>Reserve now, pay later</p>
      <div class="rating">
        <span>7.0</span>
        <span>Good</span>
        <span>62 reviews</span>
      </div>
      <div class="price">
        <span>$164</span>
        <span>$598 total</span>
        <span>includes taxes & fees</span>
      </div>
      <button class="button">Sign in for extra savings</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    details: { type: Object },
  },
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  gap: 20px;
  .images {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.rating {
  display: flex;
  gap: 10px;
  align-items: center;
}

.rating span:first-child {
  font-size: 24px;
  font-weight: bold;
}

.rating span:nth-child(2) {
  font-size: 18px;
  font-weight: bold;
}

.price {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.price span:first-child {
  font-size: 32px;
  font-weight: bold;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
