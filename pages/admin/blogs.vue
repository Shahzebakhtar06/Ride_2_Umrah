<template>
  <div>
    <div id="add-edit-blogs" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Blogs</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Blog
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
            <a-form-model-item has-feedback label="blog Title" prop="title">
              <a-input
                v-model="form.title"
                type="text"
                autocomplete="off"
                placeholder="blog Title"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Blog Image" prop="image">
              <input type="file" ref="blog_image" @change="onFileChange" />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Description"
              prop="description"
            >
              <TextEditor v-model="form.description" id="blogs" />
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
    title: "Title",
    dataIndex: "title",

    ellipsis: true,
  },

  {
    title: "Short Description",
    dataIndex: "short_description",
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
      return this.renderingFor == "Add" ? "Add New Blog" : "Edit Your Blog";
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
      visible: false,
      confirmLoading: false,
      form: {
        description: "",
        image: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: "blog title is required!",
            trigger: "blur",
          },
        ],

        description: [
          {
            required: true,
            message: "blog description is required!",
            trigger: "blur",
          },
        ],
        image: [
          {
            required: true,
            message: "blog Image is required!",
            trigger: "change",
          },
        ],
        short_description: [
          {
            required: true,
            message: "blog Short Description is required!",
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
      this.form.image = event.target.files[0];
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
      return this.$axios.get("blog", { params: params });
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
              id: form.id,
              image: form.image,
              title: form.title,
              description: form.description,
              short_description: form.short_description,
            };
            this.image;

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });
            try {
              let res = await this.$axios.post(`blog/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "blog Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "blog Updating Failed";
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
            const fields = {
              image: form.image,
              title: form.title,
              description: form.description,
              short_description: form.short_description,
            };

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });

            try {
              let res = await this.$axios.post("blog", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "blog Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "blog Creation Failed";
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
      this.$refs.blog_image.value = "";
      this.form = {
        title: "",
        image: null,
        description: "",
        id: undefined,
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
          title: "Are you sure delete this blog?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`blog/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "blog Deleted Successfully",
                });
              }
              this.fetch();
            } catch (e) {
              console.log(e);
              this.$notification.error({
                message: "blog Deletion Failed",
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
