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
            <a-form-model-item has-feedback label="Hotel City" prop="city_id">
              <a-select
                v-model="form.city_id"
                style="width: 100%"
                placeholder="Please select"
                @change="handleAmenitiesChange"
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
                @change="handleAmenitiesChange"
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
              <input type="file" @change="handleFeaturedImageChange" />
            </a-form-model-item>

            <a-form-model-item has-feedback label="Hotel Images" prop="images">
              <div class="image-uploader">
                <input type="file" @change="onFileChange" multiple />
                <div v-if="hotelImages.length" class="images-box">
                  <h3>Selected Images:</h3>
                  <ul>
                    <li v-for="(image, index) in hotelImages" :key="index">
                      <!-- getImageUrl(image.url) -->
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
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Short Description",
    dataIndex: "short_description",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "City",
    dataIndex: "city.name",

    sorter: true,
    ellipsis: true,
    // scopedSlots: { customRender: "city" },
  },
  {
    title: "Rating",
    dataIndex: "rating",
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
      },
    };
  },
  mounted() {
    // console.log(this.$axios);
    this.fetch();
    this.fetchAmenities();
    this.fetchCities();
  },
  methods: {
    handleAmenitiesChange(value) {
      console.log(`selected ${value}`);
    },
    async fetchAmenities() {
      let res = await this.$axios.get("amenity/all?type=hotel");
      let amenities = res.data.data.response.amenities;
      this.amenities = amenities;
    },
    async fetchCities() {
      let res = await this.$axios.get("city");
      let cities = res.data.data.response.data;
      this.cities = cities;
    },
    getImageUrl(imagePath) {
      let url = "https://expedia-api.savvyskymart.com/public/" + imagePath;
      return url;
    },
    handleFeaturedImageChange(event) {
      this.form.featured_image = null;
      this.form.featured_image = event.target.files[0];
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
      return this.$axios.get("hotel", { params: params });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true;
          if (this.renderingFor == "Edit") {
            const formData = new FormData();
            formData.append("id", this.form.id);
            formData.append("featured_image", this.form.featured_image);
            formData.append("city_id", this.form.city_id);

            this.form.amenities.map((el, index) => {
              formData.append(`amenities[${index}]`, el);
            });

            if (this.hotelImages.length) {
              this.hotelImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image.file);
              });
            }
            formData.append("name", this.form.name);
            formData.append("rating", this.form.rating);
            formData.append("short_description", this.form.short_description);
            for (let [key, value] of formData.entries()) {
              console.log(`${key}:  ${typeof value}`);
            }
            try {
              let res = await this.$axios.post(`hotel/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Hotel Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Hotel Updating Failed",
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

            this.form.amenities.map((el, index) => {
              formData.append(`amenities[${index}]`, el);
            });
            formData.append("city_id", this.form.city_id);
            formData.append("featured_image", this.form.featured_image);

            // formData.append("amenities[]",  JSON.stringify(this.form.amenities));
            formData.append("name", this.form.name);
            formData.append("rating", this.form.rating);
            formData.append("short_description", this.form.short_description);
            try {
              let res = await this.$axios.post("hotel", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "Hotel Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Hotel Creation Failed",
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
        box-shadow: -1px 0px 5px 6px #cbc8c8;
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
    }
  }
}
.image-uploader {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.image-uploader img {
  margin: 5px;
}
</style>
