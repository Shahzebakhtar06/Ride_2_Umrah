<template>
  <div class="main" :style="mainStyle">
    <h1>Welcome!</h1>
    <CustomInput
      type="text"
      name="username"
      id="username"
      placeholder="User Name"
      :style="input"
    />
    <br />
    <CustomInput
      type="password"
      name="password"
      id="password"
      placeholder="P@$$W0RD"
      :style="input"
    />
    <br />
    <a-button type="primary"> login </a-button>
    <br />
    <!-- <img src="../assets/google.svg" alt="Login using Google" />
      <img src="../assets/facebook.svg" alt="Login using Facebook" /> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  layout: "Login",
  //Custom style for main and input for make the page responsive:
  props: {
    mainStyle: String,
    inputStyle: String,
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
