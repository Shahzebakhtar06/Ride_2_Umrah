<template>
  <div class="container" :class="{ loader: fetchLoading }">
    <div class="faqs-page">
      <a-collapse :activeKey="activeFaq" accordion>
        <a-collapse-panel
          v-for="faq in faqs"
          :key="`q-${faq.id}`"
          :header="faq.question"
        >
          <p>{{ faq.answer }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      faqs: [],
      activeFaq: "q-1",
      fetchLoading: true,
    };
  },
  mounted() {
    this.fetchFaqs();
    this.$store.commit("SET_BANNER_TITLE", "FAQs");
  },
  methods: {
    async fetchFaqs() {
      this.fetchLoading = true;

      let res = await this.$axios.get("faqs");

      this.faqs = res.data.data.response.data;
      this.fetchLoading = false;
    },
  },
};
</script>
<style lang="scss">
.faqs-page {
  margin: 5rem 0rem;
  .ant-collapse-header {
    font-weight: 600;
  }
}
</style>
