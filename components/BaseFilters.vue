<template>
  <div id="base-filters">
    <a-button
      type="primary"
      @click="openFilterModal"
      v-if="response && mobileView"
      >Filters</a-button
    >
    <filter-form
      :fields="fields"
      v-else
      @submit="(val) => $emit('submit', val)"
    ></filter-form>
    <a-modal :visible="showFilterModal" @cancel="cancelFilterModal">
      <filter-form :fields="fields"></filter-form>
    </a-modal>
  </div>
</template>

<script>
import FilterForm from "@/components/FilterForm.vue";
export default {
  components: {
    FilterForm,
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    response: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      mobileView: true,
      showFilterModal: false,
    };
  },
  watch: {},
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 768;
    },
    cancelFilterModal() {
      this.showFilterModal = false;
    },
    openFilterModal() {
      this.showFilterModal = true;
    },
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleView);
  },
};
</script>

<style lang="scss"></style>
