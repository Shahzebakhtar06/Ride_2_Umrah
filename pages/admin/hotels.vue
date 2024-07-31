<template>
  <div>
    <div id="add-edit-hotels" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Hotels</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Hotel
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
            :labelCol="{ span: 24 }"
            :wrapperCol="{ span: 24 }"
          >
            <a-form-model-item has-feedback label="Hotel Name" prop="name">
              <a-input
                v-model="form.name"
                type="text"
                autocomplete="off"
                placeholder="Hotel Name"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Hotel Rating" prop="rating">
              <a-input-number
                style="width: 100%"
                v-model="form.rating"
                autocomplete="off"
                placeholder="Hotel Rating"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Hotel Price" prop="price">
              <a-input-number
                v-model="form.price"
                type="text"
                autocomplete="off"
                placeholder="Hotel Price"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Hotel City" prop="city_id">
              <a-select
                v-model="form.city_id"
                style="width: 100%"
                placeholder="Please select"
              >
                <a-select-option v-for="item in cities" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Hotel Amenities"
              prop="amenities"
            >
              <a-select
                mode="multiple"
                v-model="form.amenities"
                style="width: 100%"
                placeholder="Please select"
              >
                <a-select-option
                  v-for="item in amenities"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Hotel Short Description"
              prop="short_description"
            >
              <a-textarea
                v-model="form.short_description"
                placeholder="Hotel Short Description"
              />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Hotel Featured Images"
              prop="featured_image"
            >
              <input
                type="file"
                ref="featured_image"
                @change="handleFeaturedImageChange"
              />
            </a-form-model-item>

            <a-form-model-item has-feedback label="Hotel Images" prop="images">
              <div class="image-uploader">
                <input
                  type="file"
                  ref="hotel_images"
                  @change="onFileChange"
                  multiple
                />
                <div v-if="hotelImages.length" class="images-box">
                  <h3>Selected Images:</h3>
                  <ul>
                    <li v-for="(image, index) in hotelImages" :key="index">
                      <img
                        :src="image.url"
                        :alt="'Image ' + (index + 1)"
                        width="100"
                      />
                    </li>
                  </ul>
                </div>
              </div>
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
    ellipsis: true,
  },
  {
    title: "Short Description",
    dataIndex: "short_description",
    ellipsis: true,
  },
  {
    title: "City",
    dataIndex: "city.name",

    ellipsis: true,
    // scopedSlots: { customRender: "city" },
  },
  {
    title: "Rating",
    dataIndex: "rating",
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
      return this.renderingFor == "Add" ? "Add New Hotel" : "Edit Your Hotel";
    },
  },
  data() {
    return {
      data: [],
      image: "",
      imgLoading: "",
      pagination: {},
      amenities: [],
      cities: [],
      hotelImages: [],
      loading: false,
      columns,
      renderingFor: "Add",
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      form: {
        description: "",
        images: [],
        featured_image: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Hotel Name is required!",
            trigger: "blur",
          },
        ],
        city_id: [
          {
            required: true,
            message: "Hotel city is required!",
            trigger: "blur",
          },
        ],
        short_description: [
          {
            required: true,
            message: "Hotel short description is required!",
            trigger: "blur",
          },
        ],
        rating: [
          {
            required: true,
            message: "Hotel Rating is required!",
            trigger: "blur",
          },
          {
            type: "number",
            max: 7,
            min: 0,
            message: "Hotel Rating should be between 0 to 7!",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.fetch();
    this.fetchAmenities();
    this.fetchCities();
  },
  methods: {
    async fetchAmenities() {
      let res = await this.$axios.get("amenity/all?type=hotel");
      let amenities = res.data.data.response.amenities;
      this.amenities = amenities;
    },
    async fetchCities() {
      let res = await this.$axios.get("city/all");
      let cities = res.data.data.response.cities;
      this.cities = cities;
    },
    handleFeaturedImageChange(event) {
      this.form.featured_image = null;
      this.form.featured_image = event.target.files[0];
      console.log(this.form.featured_image);
    },
    handleImagesChange(event) {
      this.hotelImages = event.target.files;
    },
    onFileChange(event) {
      const files = event.target.files;
      this.hotelImages = []; // Clear previous images
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.hotelImages.push({ file: files[i], url: e.target.result });
        };
        reader.readAsDataURL(files[i]);
      }
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
      return this.$axios.get("hotel", { params: params });
    },
    showModal() {
      this.visible = true;
    },
    async handleOk(e) {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          let form = this.form;
          this.confirmLoading = true;
          if (this.renderingFor == "Edit") {
            const formData = new FormData();
            const fields = {
              id: form.id,
              featured_image: form.featured_image,
              price: form.price,
              city_id: form.city_id,
              name: form.name,
              rating: form.rating,
              short_description: form.short_description,
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

            if (this.hotelImages.length) {
              this.hotelImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image.file);
              });
            }

            try {
              let res = await this.$axios.post(`hotel/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Hotel Updated Successfully",
                });
              }
              this.handleCancel();
              this.fetch();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "Hotel Updating Failed";
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
            const formData = new FormData();
            if (this.hotelImages.length) {
              this.hotelImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image.file);
              });
            }
            if (this.form.amenities) {
              this.form.amenities.map((el, index) => {
                formData.append(`amenities[${index}]`, el);
              });
            }

            const fields = {
              featured_image: form.featured_image,
              city_id: form.city_id,
              name: form.name,
              rating: form.rating,
              price: form.price,
              short_description: form.short_description,
            };

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });
            try {
              let res = await this.$axios.post("hotel", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "Hotel Created Successfully",
                });
              }
              this.fetch();
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "Hotel Creation Failed";
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
      this.$refs.featured_image.value = "";
      this.$refs.hotel_images.value = "";
      this.hotelImages = [];
      this.form = {
        name: "",
        rating: undefined,
        city_id: undefined,
        amenities: [],
        short_description: "",
        images: [],
        featured_image: null,
      };
      this.visible = false;
    },
    handleItemEdit(val) {
      this.renderingFor = "Edit";
      this.form = {
        id: val.id,
        name: val.name,
        rating: Number(val.rating),
        price: Number(val.price),
        city_id: val.city_id,
        amenities: val.amenities.map((el) => el.id),
        short_description: val.short_description,
      };
      this.showModal();
    },
    async handleItemDelete(val) {
      let isDeleting = false;
      if (val.id) {
        this.$confirm({
          title: "Are you sure delete this Hotel?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`hotel/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Hotel Deleted Successfully",
                });
              }
              this.fetch();
            } catch (e) {
              console.log(e);
              this.$notification.error({
                message: "Hotel Deletion Failed",
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
.images-box {
  ul {
    padding: 0.5rem;
    list-style: none;
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    li {
      margin: 1rem;

      img {
        box-shadow: -0.1rem 0px 0.5rem 0.6rem #cbc8c8;
        width: 10rem;
        height: 10rem;
        object-fit: cover;
      }
    }
  }
}
.image-uploader {
  padding: 2rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
}
.image-uploader img {
  margin: 0.5rem;
}
</style>
