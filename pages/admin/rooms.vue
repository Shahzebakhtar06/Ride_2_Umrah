<template>
  <div>
    <div id="add-edit-room" class="admin-layout">
      <div class="page-header">
        <div class="title">Manage Your Rooms</div>
        <div class="add-btn">
          <a-button type="primary" @click="showModal('Add')">
            Add New Room
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
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-form-model-item has-feedback label="Room Name" prop="name">
              <a-input
                v-model="form.name"
                type="text"
                autocomplete="off"
                placeholder="Room Name"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Hotel" prop="hotel_id">
              <a-select
                v-model="form.hotel_id"
                style="width: 100%"
                placeholder="Please select"
                @change="handleAmenitiesChange"
              >
                <a-select-option v-for="item in hotels" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="Room Rating" prop="rating">
              <a-input-number
                style="width: 100%"
                v-model="form.rating"
                autocomplete="off"
                placeholder="Hotel Rating"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Room Price" prop="price">
              <a-input
                style="width: 100%"
                v-model="form.price"
                autocomplete="off"
                placeholder="Hotel Price"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Room Images" prop="images">
              <div class="image-uploader">
                <input type="file" @change="onFileChange" multiple />
                <div v-if="roomImages.length" class="images-box">
                  <h3>Selected Images:</h3>
                  <ul>
                    <li v-for="(image, index) in roomImages" :key="index">
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
    title: "Hotel Name",
    dataIndex: "hotel.name",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Price",
    dataIndex: "price",
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
      return this.renderingFor == "Add" ? "Add New Room" : "Edit Your Room";
    },
  },
  data() {
    return {
      data: [],
      hotels: [],
      pagination: {},
      roomImages: [],
      loading: false,
      columns,
      renderingFor: "Add",
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "Room Name is required!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$axios);
    this.fetch();
    this.fetchHotels();
  },
  methods: {
    onFileChange(event) {
      const files = event.target.files;
      this.roomImages = []; // Clear previous images
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.roomImages.push({ file: files[i], url: e.target.result });
        };
        reader.readAsDataURL(files[i]);
      }
    },
    async fetchHotels() {
      let res = await this.$axios.get("hotel");
      let hotels = res.data.data.response.data;
      this.hotels = hotels;
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
      return this.$axios.get("room", { params: params });
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
            try {
              const formData = new FormData();
              formData.append("id", form.id);
              if (this.roomImages.length) {
                this.roomImages.forEach((image, index) => {
                  formData.append(`images[${index}]`, image.file);
                });
              }
              formData.append("name", form.name);
              formData.append("hotel_id", form.hotel_id);
              formData.append("rating", form.rating);
              formData.append("price", form.price);
              let res = await this.$axios.post(`room/update`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Room Updated Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              let errorMessage = "Room Updating Failed";
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
            try {
              const formData = new FormData();
              if (this.roomImages.length) {
                this.roomImages.forEach((image, index) => {
                  formData.append(`images[${index}]`, image.file);
                });
              }

              formData.append("name", form.name);
              formData.append("rating", form.rating);
              formData.append("hotel_id", form.hotel_id);
              formData.append("price", form.price);
              let res = await this.$axios.post(`room`, formData);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Room Created Successfully",
                });
              }
              this.handleCancel();
            } catch (e) {
              let errorMessage = "Room Creation Failed";
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
      this.roomImages = [];
      this.form = {};
      this.visible = false;
    },
    handleItemEdit(val) {
      this.renderingFor = "Edit";
      this.form = val;
      this.showModal();
    },
    async handleItemDelete(val) {
      if (val.id) {
        this.$confirm({
          title: "Are you sure delete this Room?",
          okText: "Yes",
          okType: "danger",
          okButtonProps: {
            loading: isDeleting,
          },
          cancelText: "No",
          onOk: async () => {
            isDeleting = true; // Set loading to true
            try {
              let res = await this.$axios.delete(`room/${val.id}`);
              if (res.status == 200) {
                this.$notification.success({
                  message: "Room Deleted Successfully",
                });
              }
            } catch (e) {
              this.$notification.error({
                message: "Room Deletion Failed",
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
