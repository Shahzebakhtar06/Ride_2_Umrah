<template>
  <div>
    <div id="add-edit-fare" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Fares</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Fare
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
            <div slot="Cars" slot-scope="item">
              {{ item.model }} ({{ item.type }})
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
            <a-form-model-item has-feedback label="From" prop="from">
              <a-select
                v-model="form.from"
                style="width: 100%"
                placeholder="Please select"
              >
                <a-select-option
                  v-for="item in cities"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="To" prop="to">
              <a-select
                v-model="form.to"
                style="width: 100%"
                placeholder="Please select"
              >
                <a-select-option
                  v-for="item in cities"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="Car" prop="car">
              <a-select
                v-model="form.car"
                style="width: 100%"
                placeholder="Please select"
              >
                <a-select-option
                  v-for="item in cars"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.model }} ({{ item.type }})
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="Price" prop="price">
              <a-input
                v-model="form.price"
                type="text"
                autocomplete="off"
                placeholder="Price"
              />
            </a-form-model-item>
          </a-form-model>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Cities from "./cities.vue";

const columns = [
  {
    title: "From",
    dataIndex: "from.name",

    ellipsis: true,
  },
  {
    title: "To",
    dataIndex: "to.name",

    ellipsis: true,
  },
  {
    title: "Car",
    dataIndex: "car",

    ellipsis: true,
    scopedSlots: { customRender: "Cars" },
  },

  {
    title: "Price",
    dataIndex: "price",

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
      return this.renderingFor == "Add" ? "Add New Fare" : "Edit Your Fare";
    },
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      cars: [],
      renderingFor: "Add",
      cities: [],
      visible: false,
      confirmLoading: false,
      form: {},
      rules: {
        from: [
          {
            required: true,
            message: "Fare From field is required!",
            trigger: "blur",
          },
        ],
        to: [
          {
            required: true,
            message: "Fare To field is required!",
            trigger: "blur",
          },
        ],
        car: [
          {
            required: true,
            message: "Fare Car field is required!",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "Fare Price is required!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$axios);
    this.fetch();
    this.fetchCities();
    this.fetchCars();
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
    async fetchCities() {
      let res = await this.$axios.get("city/all");
      let cities = res.data.data.response.cities;
      this.cities = cities;
    },
    async fetchCars() {
      let res = await this.$axios.get("car/all");
      let cars = res.data.data.response.cars;
      this.cars = cars;
    },
    fetch(params = {}) {
      this.loading = true;
      this.queryData({
        ...params,
      }).then(({ data }) => {
        const pagination = { ...this.pagination };
        let result = data.data.response;
        pagination.total = result.meta.total;
        pagination.pageSize = result.meta.per_page;
        pagination.page = result.meta.current_page;
        this.loading = false;
        this.data = result.data;
        this.pagination = pagination;
      });
    },
    queryData(params) {
      return this.$axios.get("fare", { params: params });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true;
          let form = this.form;
          if (this.renderingFor == "Edit") {
            try {
              // ${form.id}?name=${this.form.name}
              const formData = new FormData();
              const fields = {
                id: form.id,
                from: form.from,
                to: form.to,
                price: form.price,
                car_id: form.car,
              };

              Object.entries(fields).forEach(([key, value]) => {
                if (value) {
                  formData.append(key, value);
                }
              });
              let res = await this.$axios.post(`fare/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Fare Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "Fare Creation Failed";
              if (
                e && e.response &&
                e.response.data &&
                e.response.data.data.response
              ) {
                errorMessage = e.response.data.data.response.join(", \n");
              }

              this.$notification.error({
                message: errorMessage,
              });
              this.handleCancel();
            }
          }
          if (this.renderingFor == "Add") {
            try {
              const formData = new FormData();
              const fields = {
                from: form.from,
                to: form.to,
                price: form.price,
                car_id: form.car,
              };

              Object.entries(fields).forEach(([key, value]) => {
                if (value) {
                  formData.append(key, value);
                }
              });
              let res = await this.$axios.post(`fare`, formData);
              if (res.status == 201) {
                this.$notification.success({
                  message: "Fare Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "Fare Updating Failed";
              if (
                e && e.response &&
                e.response.data &&
                e.response.data.data.response
              ) {
                errorMessage = e.response.data.data.response.join(", \n");
              }

              this.$notification.error({
                message: errorMessage,
              });
              this.handleCancel();
            }
          }
          this.confirmLoading = false;
          this.fetch();
        }
      });
    },
    handleCancel(e) {
      this.$refs.loginForm.resetFields();
      this.form = {};
      this.visible = false;
    },
    handleItemEdit(val) {
      this.renderingFor = "Edit";
      this.form = {
        from: val.from.id,
        to: val.to.id,
        price: val.price,
        car: val.car_id,
      };
      if (val.id) {
        this.form.id = val.id;
      }
      this.showModal();
    },
    async handleItemDelete(val) {
      if (val.id) {
        let isDeleting = false;
        this.$confirm({
          title: "Are you sure delete this Fare?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`fare/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Fare Deleted Successfully",
                });
              }
            } catch (e) {
              this.$notification.error({
                message: "Fare Deletion Failed",
              });
            }
            isDeleting = false; // Set loading to true
            this.fetch();
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
