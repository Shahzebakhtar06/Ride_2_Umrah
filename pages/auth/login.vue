<template>
  <div class="main">
    <h1>Welcome!</h1>
    <CustomInput v-model="form.email" type="text" placeholder="User Name" />
    <br />
    <CustomInput v-model="form.password" placeholder="P@$$W0RD" />
    <br />
    <a-button type="primary" @click="handleLogin()"> login </a-button>

    <br />
    <!-- <img src="../assets/google.svg" alt="Login using Google" />
      <img src="../assets/facebook.svg" alt="Login using Facebook" /> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  layout: "Login",
  data() {
    return {
      loadingBtn: false,
      isInvalid: false,
      form: {},
    };
  },
  methods: {
    async handleLogin() {
      this.loadingBtn = true;
      this.isInvalid = false;
      //  let res= this.$axios.get('http://localhost:8000/user')
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        });
        this.$router.push({ name: "admin-dashboard" });
      } catch (e) {
        this.isInvalid = true;
      }
      this.loadingBtn = false;
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
