<template>
  <div id="base-filters">
    <a-button
      type="primary"
      @click="openFilterModal"
      v-if="response && isMobileView"
      >Filters</a-button
    >
    <filter-form
      :fields="fields"
      v-else
      @submit="(val) => $emit('submit', val)"
    ></filter-form>
    <a-modal
      :visible="showFilterModal"
      @cancel="cancelFilterModal"
      :footer="false"
    >
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
      showFilterModal: false,
    };
  },
  computed: {
    isMobileView() {
      return this.$store.state.mobileView;
    },
  },
  methods: {
    cancelFilterModal() {
      this.showFilterModal = false;
    },
    openFilterModal() {
      this.showFilterModal = true;
    },
  },
};
</script>

<style lang="scss"></style>
