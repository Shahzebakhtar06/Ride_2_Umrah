<template>
    <div>
      <div id="add-edit-hotels" class="admin-layout">
        <div class="page-header">
          <div class="title">Manage Your Locations</div>
          <div class="add-btn">
            <a-button type="primary" @click="showModal('Add')"> Add New Location </a-button>
          </div>
        </div>
        <div class="page-content">
          <div class="table">
            <a-table
              :columns="columns"
              :row-key="(record) => record.login.uuid"
              :data-source="data"
              :pagination="pagination"
              :loading="loading"
              @change="handleTableChange"
            >
              <template slot="name" slot-scope="name">
                {{ name.first }} {{ name.last }}
              </template>
            </a-table>
          </div>
          <a-modal
            :title="modalTitle"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <p>{{ ModalText }}</p>
          </a-modal>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "20%",
      scopedSlots: { customRender: "name" },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  export default {
    layout: "Admin",
    middleware: "checkAuth",
    computed:{
      modalTitle () {
        return this.renderingFor == 'Add'? 'Add New Location':'Edit Your Location'
      }
    },
    data() {
      return {
        data: [],
        pagination: {},
        loading: false,
        columns,
        renderingFor:'Add',
        ModalText: "Content of the modal",
        visible: false,
        confirmLoading: false,
      };
    },
    mounted() {
      // console.log(this.$axios);
      this.fetch();
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch(params = {}) {
        this.loading = true;
        this.queryData({
          results: 10,
          ...params,
        }).then(({ data }) => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
      },
      queryData(params) {
        return this.$axios.get("https://randomuser.me/api", { params: params });
      },
      showModal() {
    
        this.visible = true;
      },
      handleOk(e) {
        this.ModalText = "The modal will be closed after two seconds";
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel(e) {
        console.log("Clicked cancel button");
        this.visible = false;
      },
    },
  };
  </script>
  
  <style lang="scss">
  @import url("~/assets/scss/adminLayout.scss");
  </style>
  