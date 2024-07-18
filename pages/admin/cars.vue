<template>
  <div>
    <div id="add-edit-cars" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Cars</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Car
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
            <div slot="image" slot-scope="item">
              <img :src="getImageUrl(item)" width="60" height="60" alt="" />
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
            :labelCol="{ span: 24 }"
            :wrapperCol="{ span: 24 }"
          >
            <a-form-model-item has-feedback label="Modal" prop="model">
              <a-input
                v-model="form.model"
                type="text"
                autocomplete="off"
                placeholder="Car Model"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Type" prop="type">
              <a-input
                v-model="form.type"
                type="text"
                autocomplete="off"
                placeholder="Car Type"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Sets" prop="seats">
              <a-input-number
                v-model="form.seats"
                type="text"
                autocomplete="off"
                placeholder="Car seats"
              />
            </a-form-model-item>

            <a-form-model-item
              has-feedback
              label="Transmission Type"
              prop="transmission_type"
            >
              <a-select default-value="manual" v-model="form.transmission_type">
                <a-select-option value="manual"> Manual </a-select-option>
                <a-select-option value="auto"> auto </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Luggage Capacity"
              prop="luggage_capacity"
            >
              <a-input
                v-model="form.luggage_capacity"
                type="text"
                autocomplete="off"
                placeholder="Luggage Capacity"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Mile Age" prop="mile_age">
              <a-input
                v-model="form.mile_age"
                type="text"
                autocomplete="off"
                placeholder="Mile Age"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Address" prop="address">
              <a-input
                v-model="form.address"
                type="text"
                autocomplete="off"
                placeholder="Address"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="rating" prop="rating">
              <a-input-number
                v-model="form.rating"
                type="text"
                autocomplete="off"
                placeholder="Rating"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Car Image" prop="image">
              <input type="file" @change="onFileChange" />
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
    title: "Model",
    dataIndex: "model",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Address",
    dataIndex: "address",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Seats",
    dataIndex: "seats",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Transmission Type",
    dataIndex: "transmission_type",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Image",
    dataIndex: "image",
    sorter: true,
    scopedSlots: { customRender: "image" },
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
      return this.renderingFor == "Add" ? "Add New Car" : "Edit Your Car";
    },
  },
  data() {
    return {
      data: [],
      image: "",
      imgLoading: "",
      pagination: {},
      loading: false,
      columns,
      renderingFor: "Add",
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      form: {
        description: "",
        image: null,
        transmission_type: "manual",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Car Name is required!",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "Car Type is required!",
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
    getImageUrl(imagePath) {
      let url =
        "https://expedia-api.savvyskymart.com/uploads/cars/" + imagePath;
      return url;
    },
    onFileChange(event) {
      this.form.image = event.target.files[0];
    },

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
        pagination.total = result.meta.total_pages;
        this.loading = false;
        this.data = result.data;
        this.pagination = pagination;
      });
    },
    queryData(params) {
      return this.$axios.get("car", { params: params });
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
            const formData = new FormData();
            if (form.image) {
              formData.append("image", form.image);
            }
            formData.append("id", form.id);
            formData.append("type", this.form.type);
            formData.append("model", this.form.model);
            formData.append("seats", this.form.seats);
            formData.append("luggage_capacity", this.form.luggage_capacity);
            formData.append("transmission_type", this.form.transmission_type);
            formData.append("mileage", this.form.mile_age);
            formData.append("address", this.form.address);
            formData.append("rating", this.form.rating);
            try {
              let res = await this.$axios.post(`car/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Car Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Car Updating Failed",
              });
              this.handleCancel();
            }
          }
          if (this.renderingFor == "Add") {
            const formData = new FormData();
            formData.append("image", this.form.image);
            formData.append("type", this.form.type);
            formData.append("model", this.form.model);
            formData.append("seats", this.form.seats);
            formData.append("luggage_capacity", this.form.luggage_capacity);
            formData.append("transmission_type", this.form.transmission_type);
            formData.append("mileage", this.form.mile_age);
            formData.append("address", this.form.address);
            formData.append("rating", this.form.rating);
            try {
              let res = await this.$axios.post("car", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "Car Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Car Creation Failed",
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
      this.form = {
        name: "",
        image: null,
        description: "",
        id: undefined,
        price: "",
      };
      this.visible = false;
    },
    handleItemEdit(val) {
      this.renderingFor = "Edit";
      this.form = val;
      this.showModal();
    },
    async handleItemDelete(val) {
      let isDeleting = false;
      if (val.id) {
        this.$confirm({
          title: "Are you sure delete this Car?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`car/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Car Deleted Successfully",
                });
              }
              this.fetch();
            } catch (e) {
              console.log(e);
              this.$notification.error({
                message: "Car Deletion Failed",
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
