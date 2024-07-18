<template>
  <div>
    <div id="add-edit-amenities" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Amenities</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Amenity
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
            <a-form-model-item has-feedback label="Amenity Name" prop="name">
              <a-input
                v-model="form.name"
                type="text"
                autocomplete="off"
                placeholder="Amenity Name"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Amenity Type" prop="type">
              <a-select default-value="room" v-model="form.type">
                <a-select-option value="room"> Room </a-select-option>
                <a-select-option value="car"> Car </a-select-option>
                <a-select-option value="hotel"> Hotel </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="Amenity Description"
              prop="description"
            >
              <a-textarea
                v-model="form.description"
                placeholder="Amenity Description"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Amenity Image" prop="image">
              <input type="file"  @change="onFileChange" />
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
        ? "Add New Amenity"
        : "Edit Your Amenity";
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
      },
      rules: {
        name: [
          {
            required: true,
            message: "Amenity Name is required!",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "Amenity Type is required!",
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
      let url = "https://expedia-api.savvyskymart.com/uploads/amenities/" + imagePath;
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
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = result.meta.total_pages;
        this.loading = false;
        this.data = result.data;
        this.pagination = pagination;
      });
    },
    queryData(params) {
      return this.$axios.get("amenity", { params: params });
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
            formData.append("name", form.name);
            formData.append("type", form.type);
            formData.append("description", form.description);
            try {
              let res = await this.$axios.post(`amenity/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Amenity Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Amenity Updating Failed",
              });
              this.handleCancel();
            }
          }
          if (this.renderingFor == "Add") {
            const formData = new FormData();
            formData.append("image", this.form.image);
            formData.append("name", this.form.name);
            formData.append("type", this.form.type);
            formData.append("description", this.form.description);
            try {
              let res = await this.$axios.post("amenity", formData);

              if (res.status == 201) {
                this.$notification.success({
                  message: "Amenity Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              this.$notification.error({
                message: "Amenity Creation Failed",
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
          title: "Are you sure delete this Amenity?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`amenity/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Amenity Deleted Successfully",
                });
              }
              this.fetch();
            } catch (e) {
              console.log(e);
              this.$notification.error({
                message: "Amenity Deletion Failed",
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
