<template>
  <div>
    <div id="add-edit-faqs" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Faqs</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Faq
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
            <a-form-model-item has-feedback label="question" prop="question">
              <a-input
                v-model="form.question"
                type="text"
                autocomplete="off"
                placeholder="question"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Answer" prop="answer">
              <a-textarea v-model="form.answer" placeholder="Answer" />
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
    title: "Question",
    dataIndex: "question",

    ellipsis: true,
  },

  {
    title: "Answer",
    dataIndex: "answer",
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
      return this.renderingFor == "Add" ? "Add New Faq" : "Edit Your Faq";
    },
  },
  data() {
    return {
      data: [],

      pagination: {},
      loading: false,
      columns,
      renderingFor: "Add",
      visible: false,
      confirmLoading: false,
      form: {
        description: "",
      },
      rules: {
        question: [
          {
            required: true,
            message: "Question is required!",
            trigger: "blur",
          },
        ],

        answer: [
          {
            required: true,
            message: "Answer is required!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
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
      return this.$axios.get("faq", { params: params });
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
              answer: form.answer,
              question: form.question,
            };
            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });
            try {
              let res = await this.$axios.post(`faq/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "faq Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "faq Updating Failed";
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
            const fields = {
              answer: form.answer,
              question: form.question,
            };

            Object.entries(fields).forEach(([key, value]) => {
              if (value) {
                formData.append(key, value);
              }
            });

            try {
              let res = await this.$axios.post("faq", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "faq Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.confirmLoading = false;

              let errorMessage = "faq Creation Failed";
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
      this.form = {
        question: "",
        answer: "",

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
          title: "Are you sure delete this faq?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`faq/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "faq Deleted Successfully",
                });
              }
              this.fetch();
            } catch (e) {
              console.log(e);
              this.$notification.error({
                message: "faq Deletion Failed",
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
