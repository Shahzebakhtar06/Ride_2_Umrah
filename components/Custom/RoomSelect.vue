<template>
  <div class="room-select">
    <div class="dropdown" @click="toggleDropdown">
      <span>{{ summary }}</span>
    </div>
    <!-- <div v-if="isOpen" class="dropdown-content"> -->
    <a-popover
      v-model="isOpen"
      overlayClassName="room-select-content"
      trigger="click"
    >
      <!-- <template #title></template> -->
      <template #content>
        <div v-for="(room, index) in rooms" :key="index" class="room">
          <div class="room-title">Room {{ index + 1 }}</div>
          <div class="counter row">
            <div class="label col">
              <span>Adults</span>
            </div>
            <div class="content col fit-width">
              <a-button @click="decrement(room, 'adults')">-</a-button>
              <span>{{ room.adults }}</span>
              <a-button @click="increment(room, 'adults')">+</a-button>
            </div>
          </div>
          <div class="counter row">
            <div class="label col">
              <span>Children</span>
            </div>
            <div class="content col fit-width">
              <a-button @click="decrement(room, 'children')">-</a-button>
              <span>{{ room.children }}</span>
              <a-button @click="increment(room, 'children')">+</a-button>
            </div>
          </div>
        </div>
        <div style="text-align: right;">
            <div class="add-room" @click="addRoom">Add another room</div>
        <a-button type="primary" class="done-btn" @click="closeDropdown">Done</a-button>
        </div>
        </template>
    </a-popover>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      rooms: [{ adults: 1, children: 0 }],
    };
  },
  computed: {
    summary() {
      const totalRooms = this.rooms.length;
      const totalAdults = this.rooms.reduce(
        (sum, room) => sum + room.adults,
        0
      );
      const totalChildren = this.rooms.reduce(
        (sum, room) => sum + room.children,
        0
      );
      return `${totalAdults + totalChildren} travelers, ${totalRooms} room${
        totalRooms > 1 ? "s" : ""
      }`;
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    addRoom() {
      this.rooms.push({ adults: 1, children: 0 });
    },
    increment(room, type) {
      room[type]++;
    },
    decrement(room, type) {
      if (room[type] > 0) {
        room[type]--;
      }
    },
  },
};
</script>

<style lang="scss">
.room-select {
  position: relative;
  display: inline-block;
  width: 100%;
}
.dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
}
.room-select-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  min-width: 26rem;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.15);
}
.room {
  margin-bottom: 1.6rem;
}
.room-title {
  font-weight: bold;
  margin-bottom: 0.8rem;
}
.counter {
  align-items: center;
  margin-bottom: 0.8rem;
  .content {
    display: flex;
    align-items: center;
    .ant-btn {
      border-radius: 50%;
      padding: 0 0.3rem;
      font-size: 2rem;
      line-height: 2rem;
    }
  }
}
.counter span {
  margin: 0 8px;
}
button {
  background: none;
  border: 1px solid #ccc;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
}
.add-room {
  color: blue;
  cursor: pointer;
  margin-bottom: 16px;
}
// .done-btn {
//   background-color: blue;
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   cursor: pointer;
//   border-radius: 4px;
// }
</style>
