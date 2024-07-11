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
            <div slot="image" slot-scope="item">
              <img :src="getImageUrl(item)" width="6rem" height="6rem" alt="" />
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
                v-model="form.rating"
                autocomplete="off"
                placeholder="Hotel Rating"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Hotel City" prop="city">
              <a-select default-value="room" v-model="form.city_id">
                <a-select-option value="room"> Room </a-select-option>
                <a-select-option value="car"> Car </a-select-option>
                <a-select-option value="hotel"> Hotel </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Hotel Amenities"
              prop="amenities"
            >
              <a-select default-value="room" v-model="form.amenities">
                <a-select-option value="room"> Room </a-select-option>
                <a-select-option value="car"> Car </a-select-option>
                <a-select-option value="hotel"> Hotel </a-select-option>
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
                <div v-if="form.images.length" class="images-box">
                  <h3>Selected Images:</h3>
                  <ul>
                    <li v-for="(image, index) in form.images" :key="index">
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
    title: "Type",
    dataIndex: "type",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "description",
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
      return this.renderingFor == "Add" ? "Add New Hotel" : "Edit Your Hotel";
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
        type: [
          {
            required: true,
            message: "Hotel Type is required!",
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
      let url = "https://expedia-api.savvyskymart.com/public/" + imagePath;
      return url;
    },
    handleFeaturedImageChange(event) {
      this.form.featured_image = event.target.files[0];
    },
    handleImagesChange(event) {
      this.form.images = event.target.files;
    },
    onFileChange(event) {
      const files = event.target.files;
      this.form.images = []; // Clear previous images
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.images.push({ file: files[i], url: e.target.result });
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
          let form = this.form;
          if (form.id >= 0) {
            const formData = new FormData();
            this.form.images.forEach((image) => {
              formData.append("image[]", image.file);
            });
            formData.append("featured_image", this.form.image);
            formData.append("name", this.form.name);
            formData.append("type", this.form.type);
            formData.append("description", this.form.description);
            try {
              console.log(data, this.form.image);
              // let res = await this.$axios.put(
              //   `hotel/${form.id}?name=${this.form.name}&&type=${form.type}&&description=${form.description}&&image=${form.image}`
              // );
              let res = await this.$axios.put(`hotel/${form.id}`, formData);
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
          if (!form.id) {
            const formData = new FormData();
            formData.append("image", this.form.image);
            formData.append("name", this.form.name);
            formData.append("type", this.form.type);
            formData.append("description", this.form.description);
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
      this.form = {};
      this.visible = false;
    },
    handleItemEdit(val) {
      this.form = val;
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
  display: flex;
  list-style-type: none;
  ul{
    padding: 0.5rem;
    li{
      margin: 1rem;
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
