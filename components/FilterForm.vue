<template>
  <div id="base-filters">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        v-for="field in fields"
        :key="field.key"
        :required="field.required ? true : false"
        prop="location"
      >
        <div class="field-wrapper" v-if="field.type === 'select'">
          <div class="icon">
            <i class="fa-solid fa-location-dot"></i>
          </div>

          <div class="field">
            <div class="label">
              {{ field.label }}
            </div>
            <a-select
              :value="Number(formData[field.key])"
              :placeholder="field.placeholder"
              style="width: 100%"
              option-filter-prop="children"
              :show-search="true"
              @search="handleFilterLocation"
              @change="(e, value) => handleLocationChange(e, field.key)"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="d in filteredLocations" :key="d.id">
                {{ d.name }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="field-wrapper" v-else-if="field.type === 'date'">
          <div class="icon">
            <i class="fa-solid fa-calendar-day"></i>
          </div>

          <div class="field">
            <div class="label" v-if="formData[field.key]">
              {{ field.label }}
            </div>
            <a-range-picker
              :disabled-date="disabledDate"
              :value="formData[field.key] ? formData[field.key] : null"
              format="YYYY-MM-DD"
              :placeholder="['Pick Up Date', 'Drop Off Date']"
              @change="(val, e) => onDateChange(field.key, val)"
            />
          </div>
        </div>
        <div class="field-wrapper" v-if="field.type === 'roomSelect'">
          <div class="icon">
            <i class="fa-solid fa-user"></i>
          </div>

          <div class="field">
            <div class="label" v-if="formData[field.key]">
              {{ field.label }}
            </div>
            <CustomRoomSelect
              @setRooms="
                (val) => {
                  formData[field.key] = val;
                }
              "
              :value="formData[field.key] ? formData[field.key] : []"
            />
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" customSize="large" @click="submitForm"
          >Search</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "FilterForm",
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      wrapperCol: { span: 24 },
      formData: {
        location: undefined,
      },
      searchQuery: "",
      locations: [],
      rules: {
        location: [
          {
            required: true,
            message: "location Filter is Required",
            trigger: "blur",
          },
        ],
      },

      fetching: false,
    };
  },
  computed: {
    filteredLocations() {
      if (this.searchQuery) {
        return this.locations.filter((option) =>
          option.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.locations;
      }
    },
  },
  watch: {
    fieldsValue: {
      immediate: true,
      handler(newFieldsValue) {
        this.formData = { ...newFieldsValue };
      },
    },
    fields: {
      immediate: true,
      handler(newFields) {
        newFields.forEach((el) => {
          if (!this.formData[el.key]) {
            this.$set(this.formData, el.key, el.value || "");
          }
        });
      },
    },
  },
  mounted() {
    this.fetchLocations();
  },
  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },
    handleFilterLocation(val) {
      this.searchQuery = val;
    },
    submitForm() {
      this.$store.commit("UPDATE_FILTERS", this.formData);

      this.$emit("submit", this.formData);
    },
    async fetchLocations(value) {
      this.locations = [];
      this.fetching = true;
      let endPoint = process.env.ApiBaseURL + "city/all";
      let res = await this.$axios.get(endPoint);
      let result = res.data.data.response.cities;
      this.locations = result?.length ? result : [];
      this.fetching = false;
    },
    handleLocationChange(value, fieldName) {
      Object.assign(this, {
        data: [],
        fetching: false,
      });
      this.formData[fieldName] = value;
    },
    onDateChange(name, val) {
      this.formData[name] = val;
    },
  },
};
</script>

<style lang="scss">
#base-filters {
  .ant-form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .ant-form-item {
      &:not(.ant-form-item:first-child) {
        margin: 0 1rem;
      }
    }
    @media only screen and (max-width: 768px) {
      .ant-row {
        width: 100%;
        &.ant-form-item {
          margin-bottom: 4rem !important;
        }
      }
    }
  }
  .field-wrapper {
    height: 50px;
    width: 30rem;
    border: 0.1rem solid black;
    background: #fff;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    transition: 0.5s all;
    overflow: hidden;
    * {
      background: #fff;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    .ant-input,
    .ant-select,
    .ant-select-selection,
    .ant-calendar-picker,
    .ant-select-open,
    .ant-select-selection {
      background: transparent;
      border: none;
      outline: none;
      box-shadow: none !important;
      line-height: normal;
      input,
      span {
        font-weight: 600;
      }
      &:hover,
      &:focus,
      &:active {
        box-shadow: none !important;
        border: none;
        outline: none;
      }
    }
    .ant-select {
      padding-top: 1.2rem;
      padding-bottom: 0.5rem;
      font-size: 15px;
      font-weight: 600;
      .ant-select-selection__rendered {
        margin-left: 0;
      }
    }
    .ant-calendar-picker {
      padding-top: 1.2rem;
      padding-bottom: 0.5rem;

      .ant-calendar-picker-input {
        padding-left: 0;
        text-align: left;
        margin-left: -1.2rem;
      }
      .ant-calendar-range-picker-separator {
        vertical-align: text-top;
      }
    }
    .icon {
      padding: 1.2rem;
      line-height: normal;
      i {
        font-size: 20px;
      }
    }
    .field {
      position: relative;
      .label {
        line-height: normal;
        position: absolute;
        top: 0.3rem;
        z-index: 2;
        font-size: 11px;
      }
      height: -webkit-fill-available;
      height: -moz-available;
      width: -webkit-fill-available;
      width: -moz-available;
    }
  }
}
</style>
