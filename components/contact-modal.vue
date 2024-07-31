<template>
  <div>
    <a-modal
      :visible="showContactModal"
      width="70rem"
      :footer="false"
      @cancel="handleClose"
      wrapClassName="contact-us-modal-wrapper"
    >
      <div class="contact-us-modal">
        <a-row>
          <a-col :span="12">
            <div class="contact-form">
              <contact-form />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="image">
              <img src="~/static/images/banner1.jpg" alt="" />
            </div>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import contactForm from "@/components/contact-form.vue";

export default {
  components: {
    contactForm,
  },
  props: {
    showContactModal: {
      type: Boolean,
      default: false,
    },
  },
  methods:{
    handleClose(){
      console.log('working')
      this.$emit('cancel')
    }
  }
};
</script>

<style lang="scss">
.contact-us-modal-wrapper {
  .ant-modal-body {
    padding: 0;
  }
  .contact-us-modal {
    .contact-form {
      margin: 2rem 1rem;
    }
    .image {
      img {
        width: 100%;
        aspect-ratio: 4 / 5;
        object-fit: cover;
      }
    }
  }
  .ant-modal-close-x {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    margin: 0.5rem;
    background: var(--theme-primary-color);
    color: #fff;
    border-radius: 50%;
    margin: 0.5rem;
  }
}
</style>
