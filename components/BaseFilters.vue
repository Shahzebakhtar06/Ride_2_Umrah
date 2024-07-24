<template>
  <div id="base-filters">
    <a-form-model ref="ruleForm" :model="formData" :rules="rules">
      <a-form-model-item
        v-for="field in fields"
        :key="field.key"
        :required="field.required ? true : false"
        :prop="field.key"
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
              :value="formData[field.key]"
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
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    this.lastFetchId = 0;
    return {
      formData: {
        location: undefined,
      },
      searchQuery: "",
      locations: [],
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
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
    fields: {
      immediate: true,
      handler(newFields) {
        newFields.forEach((field) => {
          this.$set(this.formData, field.key, field.value || "");
        });
      },
    },
  },
  mounted() {
    this.fetchLocations();
  },
  methods: {
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf("day");
    },
    handleFilterLocation(val) {
      this.searchQuery = val;
    },
    submitForm() {
      this.$store.commit("updateFilters", this.formData);
      console.log(this.$store.state.activeFilters);

      this.$emit("submit", this.formData);
    },
    async fetchLocations(value) {
      this.locations = [];
      this.fetching = true;
      let endPoint = process.env.ApiBaseURL + "city/all";
      let res = await this.$axios.get(endPoint);
      let result = res.data.data.response.cities;
      this.locations = result;
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
    .ant-form-item {
      &:not(.ant-form-item:first-child) {
        margin: 0 1rem;
      }
    }
  }
  .field-wrapper {
    width: 30rem;
    height: 4.5rem;
    border: 0.1rem solid #969393;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    transition: 0.5s all;

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
      font-size: 1.5rem;
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
        font-size: 2rem;
      }
    }
    .field {
      position: relative;
      .label {
        line-height: normal;
        position: absolute;
        top: 0.3rem;
        font-size: 1.1rem;
      }
      height: -webkit-fill-available;
      height: -moz-available;
      width: -webkit-fill-available;
      width: -moz-available;
    }
  }
}
</style>
