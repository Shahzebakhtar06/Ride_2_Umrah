<template>
  <div>
    <div id="add-edit-visas" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Visas</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Visa
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
            <a-form-model-item has-feedback label="Visa Name" prop="name">
              <a-input
                v-model="form.name"
                type="text"
                autocomplete="off"
                placeholder="Visa Name"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Price" prop="price">
              <a-input
                v-model="form.price"
                type="text"
                autocomplete="off"
                placeholder="Visa Price"
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
              <TextEditor v-model="form.description" />
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
            <a-form-model-item has-feedback label="Visa Images" prop="images">
              <div class="image-uploader">
                <input
                  type="file"
                  ref="visa_images"
                  @change="onFileChange"
                  multiple
                />
                <div v-if="visaImages.length" class="images-box">
                  <h3>Selected Images:</h3>
                  <ul>
                    <li v-for="(image, index) in visaImages" :key="index">
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
import TextEditor from "@/components/Custom/TextEditor.vue";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    ellipsis: true,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    ellipsis: true,
  },
  {
    title: "Short Description",
    dataIndex: "short_description",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "description",
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
  components: { TextEditor },
  computed: {
    modalTitle() {
      return this.renderingFor == "Add" ? "Add New Visa" : "Edit Your Visa";
    },
  },
  data() {
    return {
      data: [],
      image: "",
      imgLoading: "",
      pagination: {},
      visaImages: [],

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
            message: "Visa Name is required!",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "Visa Type is required!",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Visa description is required!",
            trigger: "blur",
          },
        ],
        rating: [
          {
            required: true,
            message: "Visa rating is required!",
            trigger: "blur",
          },
          {
            type: "number",
            max: 10,

            message: "Visa Rating is Should be between 0 to 10!",
            trigger: "change",
          },
        ],
        price: [
          {
            required: true,
            message: "Visa price is required!",
            trigger: "blur",
          },
        ],
        short_description: [
          {
            required: true,
            message: "Visa Short Description is required!",
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
      this.visaImages = []; // Clear previous images
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.visaImages.push({ file: files[i], url: e.target.result });
        };
        reader.readAsDataURL(files[i]);
      }
    },

    handleTableChange(pagination, filters) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
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
      return this.$axios.get("visa", { params: params });
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
            if (this.visaImages.length) {
              this.visaImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image.file);
              });
            }

            const fields = {
              id: form.id,
              price: form.price,
              name: form.name,
              rating: form.rating,
              description: form.description,
              short_description: form.short_description,
            };

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });
            try {
              let res = await this.$axios.post(`visa/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Visa Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "Visa Updating Failed";
              if (
                e.response &&
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
            if (this.visaImages.length) {
              this.visaImages.forEach((image, index) => {
                formData.append(`images[${index}]`, image.file);
              });
            }
            const fields = {
              price: form.price,
              name: form.name,
              rating: form.rating,
              description: form.description,
              short_description: form.short_description,
            };

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });

            try {
              let res = await this.$axios.post("visa", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "Visa Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "Visa Creation Failed";
              if (
                e.response &&
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
      this.$refs.visa_images.value = "";
      this.visaImages = [];
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
          title: "Are you sure delete this Visa?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`visa/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Visa Deleted Successfully",
                });
              }
              this.fetch();
            } catch (e) {
              console.log(e);
              this.$notification.error({
                message: "Visa Deletion Failed",
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
