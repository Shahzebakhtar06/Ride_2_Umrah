<template>
  <div class="reservation-details">
    <h2>Who's checking in?</h2>
    <a-form-model
      ref="loginForm"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-form-model-item has-feedback label="First Name" prop="first_name">
        <a-input
          v-model="form.first_name"
          type="text"
          autocomplete="off"
          placeholder="First Name"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Last Name" prop="last_name">
        <a-input
          v-model="form.last_name"
          type="text"
          autocomplete="off"
          placeholder="Last Name"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Email Address" prop="email">
        <a-input
          v-model="form.email"
          type="text"
          autocomplete="off"
          placeholder="Email Address for confirmation"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Phone Number" prop="phone">
        <a-input-number
          style="width: 100%"
          v-model="form.phone"
          autocomplete="off"
          placeholder="Phone Number"
        />
      </a-form-model-item>
      <a-form-model-item  style="text-align: center;">
        <a-button type="primary" > Book Now</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: "ReservationDetails",
  components: {},
  data() {
    return {
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "Room Name is required!",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
.ant-input-number-handler-wrap {
  display: none !important;
}
.reservation-details {
  width: 50%;
  padding: 20px;
}
</style>
