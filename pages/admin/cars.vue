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
              <img :src="$global.imgBasePath + item" width="60" height="60" alt="" />
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
            <a-form-model-item has-feedback label="Amenities" prop="amenities">
              <a-select
                mode="multiple"
                v-model="form.amenities"
                style="width: 100%"
                placeholder="Please select"
              >
                <a-select-option v-for="item in amenities" :key="item.id">
                  {{ item.name }}
                </a-select-option>
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
            <a-form-model-item has-feedback label="Mile Age" prop="mileage">
              <a-input
                v-model="form.mileage"
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
              <input type="file" ref="car_image" @change="onFileChange" />
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

    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "type",

    ellipsis: true,
  },
  {
    title: "Address",
    dataIndex: "address",

    ellipsis: true,
  },
  {
    title: "Rating",
    dataIndex: "rating",

    ellipsis: true,
  },
  {
    title: "Seats",
    dataIndex: "seats",

    ellipsis: true,
  },
  {
    title: "Transmission Type",
    dataIndex: "transmission_type",

    ellipsis: true,
  },
  {
    title: "Image",
    dataIndex: "image",

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
      amenities: [],
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
        model: [
          {
            required: true,
            message: "Car Model is required!",
            trigger: "blur",
          },
        ],
        seats: [
          {
            required: true,
            message: "Car Seats is required!",
            trigger: "blur",
          },
        ],
        mileage: [
          {
            required: true,
            message: "Car MileAge is required!",
            trigger: "blur",
          },
        ],
        rating: [
          {
            required: true,
            message: "Car Rating is required!",
            trigger: "blur",
          },
          {
            type: "number",
            max: 10,

            message: "Car Rating is Should be between 0 to 10!",
            trigger: "change",
          },
        ],
        type: [
          {
            required: true,
            message: "Car Type is required!",
            trigger: "blur",
          },
        ],
        image: [
          {
            required: true,
            message: "Car Image is required!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$axios);
    this.fetch();
    this.fetchAmenities();
  },
  methods: {
    async fetchAmenities() {
      let res = await this.$axios.get("amenity/all?type=car");
      let amenities = res.data.data.response.amenities;
      this.amenities = amenities;
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

            const fields = {
              image: form.image,
              id: form.id,
              type: form.type,
              model: form.model,
              seats: form.seats,
              luggage_capacity: form.luggage_capacity,
              transmission_type: form.transmission_type,
              mileage: form.mileage,
              address: form.address,
              rating: form.rating,
            };

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });
            if (this.form.amenities) {
              this.form.amenities.map((el, index) => {
                formData.append(`amenities[${index}]`, el);
              });
            }
            try {
              let res = await this.$axios.post(`car/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Car Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              let errorMessage = "Car Updating Failed";
              this.confirmLoading = false;

              if (
                e &&
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
            const formData = new FormData();
            const fields = {
              image: form.image,
              type: form.type,
              model: form.model,
              seats: form.seats,
              luggage_capacity: form.luggage_capacity,
              transmission_type: form.transmission_type,
              mileage: form.mileage,
              address: form.address,
              rating: form.rating,
            };

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });
            if (this.form.amenities) {
              this.form.amenities.map((el, index) => {
                formData.append(`amenities[${index}]`, el);
              });
            }

            try {
              let res = await this.$axios.post("car", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "Car Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "Car Creation Failed";
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
      this.$refs.car_image.value = "";
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
      this.form.rating = Number(val.rating);
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
