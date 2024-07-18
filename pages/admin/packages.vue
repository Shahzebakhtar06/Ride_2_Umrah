<template>
  <div>
    <div id="add-edit-packages" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Packages</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Package
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
            <a-form-model-item has-feedback label="Package Name" prop="name">
              <a-input
                v-model="form.name"
                type="text"
                autocomplete="off"
                placeholder="Package Name"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Price" prop="price">
              <a-input
                v-model="form.price"
                type="text"
                autocomplete="off"
                placeholder="Package Price"
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
            <a-form-model-item
              has-feedback
              label="Description"
              prop="description"
            >
              <a-textarea
                v-model="form.description"
                placeholder="Package Description"
              />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Short Description"
              prop="short_description"
            >
              <a-textarea
                v-model="form.short_description"
                placeholder="short Description"
              />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Package Images"
              prop="images"
            >
              <div class="image-uploader">
                <input type="file" @change="onFileChange" multiple />
                <div v-if="packageImages.length" class="images-box">
                  <h3>Selected Images:</h3>
                  <ul>
                    <li v-for="(image, index) in packageImages" :key="index">
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
      return this.renderingFor == "Add"
        ? "Add New Package"
        : "Edit Your Package";
    },
  },
  data() {
    return {
      data: [],
      image: "",
      imgLoading: "",
      pagination: {},
      packageImages: [],

      loading: false,
      columns,
      renderingFor: "Add",
      visible: false,
      confirmLoading: false,
      form: {
        description: "",
        image: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Package Name is required!",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "Package Type is required!",
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
        "https://expedia-api.savvyskymart.com/uploads/pakages/" + imagePath;
      return url;
    },
    onFileChange(event) {
      const files = event.target.files;
      this.packageImages = []; // Clear previous images
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.packageImages.push({ file: files[i], url: e.target.result });
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
        this.data = result.data;
        this.pagination = pagination;
      });
    },
    queryData(params) {
      return this.$axios.get("package", { params: params });
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
            if (this.packageImages.length) {
              this.packageImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image.file);
              });
            }
            formData.append("id", form.id);
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("rating", form.rating);
            formData.append("description", form.description);
            formData.append("short_description", form.short_description);
            try {
              let res = await this.$axios.post(`package/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Package Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Package Updating Failed",
              });
              this.handleCancel();
            }
          }
          if (this.renderingFor == "Add") {
            const formData = new FormData();
            if (this.packageImages.length) {
              this.packageImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image.file);
              });
            }
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("rating", form.rating);
            formData.append("description", form.description);
            formData.append("short_description", form.short_description);
            try {
              let res = await this.$axios.post("package", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "Package Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Package Creation Failed",
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
          title: "Are you sure delete this Package?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`package/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Package Deleted Successfully",
                });
              }
              this.fetch();
            } catch (e) {
              console.log(e);
              this.$notification.error({
                message: "Package Deletion Failed",
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
