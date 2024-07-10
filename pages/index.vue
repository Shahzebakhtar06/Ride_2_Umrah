<template>
  <div>
    <div>
      <a-tabs v-model="activeTab">
        <a-tab-pane key="stays" tab="stays" >
          <BaseFilters :fields="staysFilters" @submit="handleSubmit" />
        </a-tab-pane>
        <a-tab-pane key="cars" tab="Cars" force-render>
          <BaseFilters :fields="carsFilters" @submit="handleSubmit" />
        </a-tab-pane>
        <a-tab-pane key="visa" tab="Visa">
          <BaseFilters :fields="visaFilters" @submit="handleSubmit" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  components: {
  },
  data() {
    return {
      activeTab:'stays',
      staysFilters: [
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
        {
          name:"roomSelect",
          type:"roomSelect",
          label:'Room Select',
          placeholder:'select Your rooms'
        }
      ],
      carsFilters: [
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
      visaFilters: [
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
        if(this.activeTab=='stays'){
            let query=encodeURIComponent(formData)
            console.log(query)
          // this.$router.push({name:'hotels':query:})
        }
    },
  },
};
</script>
<style lang="scss">
.ant-tabs {
  text-align: center;
  border: 1px solid var(--theme-border-color);
  .ant-tabs-bar {
    margin: 0;
    margin-bottom: 1rem;
  }
}
</style>
