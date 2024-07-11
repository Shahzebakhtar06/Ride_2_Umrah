<template>
  <div>
    <div id="add-edit-hotels" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Cities</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New City
          </a-button>
        </div>
      </div>
      <div class="page-content">
        <div class="table">
          <a-table
            :columns="columns"
            :row-key="(record) => record.id"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <div slot="actions" slot-scope="item">
              <div class="row">
                <div class="col pr-1">
                  <a-button @click="handleItemEdit(item)"
                    ><a-icon type="edit"
                  /></a-button>
                </div>
                <div class="col">
                  <a-button type="danger" @click="handleItemDelete(item)"
                    ><a-icon type="delete"
                  /></a-button>
                </div>
              </div>
            </div>
          </a-table>
        </div>
        <a-modal
          :title="modalTitle"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-form-model
            ref="loginForm"
            :model="form"
            :rules="rules"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-form-model-item has-feedback label="City Name" prop="name">
              <a-input
                v-model="form.name"
                type="text"
                autocomplete="off"
                placeholder="City Name"
              />
            </a-form-model-item>
          </a-form-model>
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
    ellipsis: true,
  },
  {
    title: "Actions",
    dataIndex: "",
    width: "11rem",
    scopedSlots: { customRender: "actions" },
  },
];
export default {
  layout: "Admin",
  middleware: "checkAuth",
  computed: {
    modalTitle() {
      return this.renderingFor == "Add" ? "Add New City" : "Edit Your City";
    },
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      renderingFor: "Add",
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "City Name is required!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$axios);
    this.fetch();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
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
        let result = data.data.response;
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = result.meta.total_pages;
        this.loading = false;
        console.log(data.data.response.data);
        this.data = result.data;
        this.pagination = pagination;
      });
    },
    queryData(params) {
      return this.$axios.get("city", { params: params });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true;
          let form = this.form;
          if (form.id >= 0) {
            try {
              let res = await this.$axios.put(
                `city/${form.id}?name=${this.form.name}`
              );
              if (res.status == 200) {
                this.$notification.success({
                  message: "City Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                  message: "City Updating Failed",
                });
              this.handleCancel();
            }
          }
          if (!form.id) {
            try {
              let res = await this.$axios.post(`city?name=${this.form.name}`);
              if (res.status == 201) {
                this.$notification.success({
                  message: "City Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                  message: "City Creation Failed",
                });
              this.handleCancel();
            }
          }
          this.confirmLoading = false;
          this.fetch()
        }
      });
    },
    handleCancel(e) {
      this.form={}
      this.visible = false;
    },
    handleItemEdit(val) {
      this.form = val;
      this.showModal();
    },
    async handleItemDelete(val) {
      if(val.id){
        this.$confirm({
          title: "Are you sure delete this City?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(
                `city/${val.id}`
              );
              if (res.status == 200) {
                this.$notification.success({
                  message: "City Deleted Successfully",
                });
              }
            } catch (e) {
              this.$notification.error({
                  message: "City Deletion Failed",
                });
            }
            isDeleting = false; // Set loading to true
          },
          onCancel() {
            isDeleting = false; // Ensure loading is reset on cancel
          },
        });
      
       
      }
    },
  },
};
</script>

<style lang="scss">
@import url("~/assets/scss/adminLayout.scss");
</style>
