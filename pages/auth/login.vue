<template>
  <div class="main">
    <h1>Welcome!</h1>
    <a-form-model
      ref="loginForm"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-form-model-item has-feedback label="email" prop="email">
        <a-input
          v-model="form.email"
          type="email"
          autocomplete="off"
          placeholder="User Email"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="password" prop="password">
        <a-input-password
          v-model="form.password"
          type="password"
          placeholder="Password"
          autocomplete="off"
        />
      </a-form-model-item>
    </a-form-model>
    <a-button @click="handleCancel()"> Cancel </a-button>
    <a-button type="primary" @click="handleLogin()"> login </a-button>

    <br />
  </div>
</template>

<script>
export default {
  name: "Login",
  layout: "Login",
  data() {
    return {
      loadingBtn: false,
      form: {},
      rules: {
        email: [
          { type: "email", message: "The input is not valid E-mail!" },
          {
            required: true,
            message: "Please input your E-mail!",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "Please Enter Your Password",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push({ name: "admin-hotels" });
    }
  },
  methods: {
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          let res={}
          try {
            res = await this.$auth.loginWith("local", {
              data: {
                email: this.form.email,
                password: this.form.password,
              },
            });
            if (res.status == 200) {
              this.$notification.success({
                message: "User Login Successful",
              });
              this.$router.push({ name: "admin-hotels" });
            } else {
              this.$notification.error({
                message: "Error",
                description: res.data.data.statusMessage,
              });
            }
          } catch (e) {
            console.log(res)
            this.$notification.error({
              message: "Invalid Credentials",
            });
          }
          this.loadingBtn = false;
        }
      });
      this.loadingBtn = true;
    },
    handleCancel() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
/* Import Poppins font: */
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.main {
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 20%;
  left: 30%;
  width: 500px;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: "Poppins", sans-serif;
}
</style>
