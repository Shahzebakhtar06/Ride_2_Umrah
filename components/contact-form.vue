<template>
  <div>
    <a-form-model ref="loginForm" :model="form" :rules="rules">
      <a-row type="flex" justify="space-between">
        <a-col :span="11">
          <a-form-model-item prop="name">
            <a-input
              size="large"
              has-feedback
              v-model="form.name"
              placeholder="User Name"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="11">
          <a-form-model-item prop="contact">
            <a-input-number
              size="large"
              v-model="form.contact"
              placeholder="Your Phone Number"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item prop="email">
        <a-input size="large" v-model="form.email" placeholder="Your Email" />
      </a-form-model-item>
      <a-form-model-item>
        <a-textarea
          :rows="6"
          v-model="form.message"
          placeholder="Your Message"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          size="large"
          type="primary"
          :loading="sendBtnLoading"
          @click="submitForm"
          style="width: 100%"
          >Send</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      sendBtnLoading: false,
      rules: {
        name: [
          {
            required: true,
            message: "Name is required!",
            trigger: "blur",
          },
        ],

        contact: [
          {
            required: true,
            message: "Phone Number is required!",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "Enter Valid email.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      let form = this.form;
      try {
        this.sendBtnLoading = true;
        let res = await this.$axios.post("enquiry", form);
        if (res.status == 200) {
          this.$notification.success({
            message: "Enquiry Submitted Successfully",
          });
        }
        this.sendBtnLoading = false;
      } catch (e) {
        this.sendBtnLoading = false;

        let errorMessage = "Please Fill Name and Phone number";
        if (e && e.response && e.response.data && e.response.data.data.response) {
          errorMessage = e.response.data.data.response.join(", \n");
        }

        this.$notification.error({
          message: errorMessage,
        });
      }
      this.form={}
    },
  },
};
</script>

<style></style>
