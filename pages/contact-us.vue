<template>
  <div>
    <div>
      <a-row>
        <a-col :span="12">
          <div class="details">
            <h1>
              Reach out with any questions you have.
            </h1>
            <p>
              Give us a call we’ll answer all your questions or feel free to email us at <a href="mailto:info@ride2umrah.com">info@ride2umrah.com</a>. We are here to help you.
            </p>
          </div>
          <a-row>
            <a-col :span="12">
              <div class="main-icon-parent">
                <i class="fab fa-whatsapp main-icons"></i>
              </div>
              <h2>Call Us</h2>
              <a href="tel:+1-224-244-5040" class="sub-icons">
                <i class="fa fa-phone"></i>
                <span>+1-224-244-5040</span>
              </a>
              <a href="mailto:info@ride2umrah.com" class="sub-icons">
                <i class="fa fa-envelope"></i>
                <span>info@ride2umrah.com</span>
              </a>
            </a-col>
            <a-col :span="12">
              <div class="main-icon-parent">
                <i class="fa fa-location main-icons"></i>
              </div>
              <h2>Call Us</h2>
              <a href="tel:+1-224-244-5040" class="sub-icons">
                <i class="fa fa-location"></i>
                <span>Dubai, burj khalifa office 4001</span>
              </a>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">col-12</a-col>
      </a-row>
    </div>
  </div>
</template>
<style scoped>
.details{
  padding: 50px 0;
}
.details h1{
  line-height: normal;
  font-weight: normal;
  padding-bottom: 20px;
}
.main-icon-parent{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
}
.main-icons{
  color: var(--theme-primary-color);
  background-color: #F8F9FA;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.266);
  border-radius: 50%;
  padding: 15px;
  font-size: 30px;
}
.sub-icons{
  color: var(--theme-primary-color);
  display: flex;
  gap: 15px;
  align-items: center;
  margin: 10px 0;
}
</style>