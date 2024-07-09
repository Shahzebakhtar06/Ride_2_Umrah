<template>
  <div>
    <BaseFilters :fields="page1Fields" @submit="handleSubmit" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page1Fields: [
        {
          name: "location",
          label: "Location",
          type: "select",
          placeholder: "Search Location",
        },
        {
          name: "Dates",
          label: "Dates",
          type: "date",
          placeholder: "Search Date",
        },
      ],
    };
  },
  methods: {
    handleSubmit(formData) {
      console.log("Page 1 Form Data:", formData);
    },
  },
};
</script>

<style></style>
