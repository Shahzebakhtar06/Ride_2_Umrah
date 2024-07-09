<template>
  <div>
    <a-form-model ref="ruleForm" :model="formData" :rules="rules">
      <a-form-model-item
        v-for="field in fields"
        :key="field.name"
        :required="field.required ? true : false"
        :prop="field.name"
      >
        <div class="field-wrapper" v-if="field.type === 'select'">
          <div class="icon">
            <i class="fa-solid fa-location-dot"></i>
          </div>

          <div class="field">
            <div class="label" v-if="formData[field.name]">
              {{ field.label }}
            </div>
            <a-select
              label-in-value
              :value="formData[field.name]"
              placeholder="Select Location"
              style="width: 100%"
              :filter-option="true"
              :show-search="true"
              :not-found-content="fetching ? undefined : null"
              @search="fetchUser"
              @change="(e, value) => handleLocationChange(e, field.name)"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="d in data" :key="d.value">
                {{ d.text }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="field-wrapper" v-else-if="field.type === 'date'">
          <div class="icon">
            <i class="fa-solid fa-location-dot"></i>
          </div>

          <div class="field">
            <div class="label" v-if="formData[field.name]">
              >
              {{ field.label }}
            </div>
            <a-range-picker
              :disabled-date="disabledDate"
              :value="formData[field.name]"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['Start Time', 'End Time']"
              @change="onDateChange"
            />
          </div>
        </div>
      </a-form-model-item>
    </a-form-model>
    <!-- <div v-for="field in fields" :key="field.name">
      <label :for="field.name">{{ field.label }}</label>
        <input v-if="field.type === 'text'" :type="field.type" v-model="formData[field.name]" :placeholder="field.placeholder" />
     
    </div> -->
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
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
    this.fetchUser = debounce(this.fetchUser, 800);
    return {
      formData: {
        location: undefined,
      },
      data: [
        { text: "pakistan", value: 1 },
        { text: "islamabad", value: 2 },
        { text: "Rawalpindi", value: 3 },
      ],
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
  watch: {
    fields: {
      immediate: true,
      handler(newFields) {
        newFields.forEach((field) => {
          this.$set(this.formData, field.name, field.value || "");
        });
      },
    },
  },
  methods: {
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf("day");
    },
    submitForm() {
      this.$emit("submit", this.formData);
    },
    fetchUser(value) {
      console.log("fetching user", value);
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      fetch("https://randomuser.me/api/?results=5")
        .then((response) => response.json())
        .then((body) => {
          if (fetchId !== this.lastFetchId) {
            // for fetch callback order
            return;
          }
          const data = body.results.map((user) => ({
            text: `${user.name.first} ${user.name.last}`,
            value: user.login.username,
          }));
          this.data = data;
          this.fetching = false;
        });
    },
    handleLocationChange(value, fieldName) {
      debugger;
      console.log(value, fieldName);
      Object.assign(this, {
        data: [],
        fetching: false,
      });
      this.formData[fieldName] = value;
    },
    onDateChange() {},
  },
};
</script>

<style lang="scss">
.ant-form{

  display: flex;
  .ant-form-item{
    &:not(.ant-form-item:first-child){

      margin: 0 1rem;
    }
  }
}
.field-wrapper {
  width: 30rem;
  height: 4rem;
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
    height: 100%;
    &:hover,
    &:focus,
    &:active {
      box-shadow: none !important;
      border: none;
      outline: none;
    }
    .ant-calendar-range-picker-separator {
      vertical-align: auto;
    }
  }
  .icon {
    padding: 1rem;
    line-height: normal;
    i {
      font-size: 2rem;
    }
  }
  .field {
    .label{
      line-height: normal;

    }
    height: -webkit-fill-available;
    height: -moz-available;
    width: -webkit-fill-available;
    width: -moz-available;
  }
}
</style>
