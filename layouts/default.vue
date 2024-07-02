<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="container">
          <default-header />
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="container">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer>
        <div class="container">Footer</div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import DefaultHeader from "../components/Layouts/DefaultHeader.vue";
export default {
  components: {
    DefaultHeader,
  },
};
</script>

<style lang="scss">
.ant-layout-header {
  background-color: var(--theme-secondary-bg-color);
  padding: 0;
}
.ant-layout-footer{
padding-left: 0;
padding-right: 0;
}
</style>
