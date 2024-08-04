<template>
  <a-modal
    :visible="modalVisibility"
    @cancel="handleCancel"
    :title="title"
  >
    <div>
      <h3>{{ currentStep.title }}</h3>
      <p>{{ currentStep.message }}</p>
    </div>
    <div slot="footer">
      <a-button @click="handleSkip">Skip</a-button>
      <a-button type="primary" @click="handleYes">Yes</a-button>
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      steps: [
        {
          title: "Select a Room",
          message: "Would you like to book another room?",
          redirectUrl: "/book-room", // Example URL for redirection
        },
        {
          title: "Choose a Car",
          message: "Would you like to book another car?",
          redirectUrl: "/book-car", // Example URL for redirection
        },
        {
          title: "Visa Information",
          message: "Do you want to book another visa?",
          redirectUrl: "/book-visa", // Example URL for redirection
        },
        {
          title: "Package Options",
          message: "Would you like to book a package?",
          redirectUrl: "/book-package", // Example URL for redirection
        },
      ],
      currentStepIndex: 0,
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.currentStepIndex] || {};
    },
    modalVisibility() {
      return this.$store.state.confirmModal;
    },
  },
  watch: {
    modalVisibility(val) {
      this.visible = val;
    },
  },
  methods: {
    handleYes() {
      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirects to the URL
      }
      this.visible = false;
    },
    handleCancel() {
      this.$store.dispatch("showConfirmModal", false);
      this.visible = false;
    },
    handleSkip() {
      this.moveToNextStep();
    },
    moveToNextStep() {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
      } else {
        this.handleCancel(); // Close the modal if it's the last step
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
