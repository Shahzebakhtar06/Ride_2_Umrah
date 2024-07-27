<script setup>
import Editor from "@tinymce/tinymce-vue";
</script>

<template>
  <main id="sample">
    <Editor
      api-key="46auy8pyr9e6dp5fpimr0lkujgjuccumkby3w9n3hs1x0yco"
      :init="config"
      :value="value"
    />
    <!-- {{ config.toolbar }} -->
  </main>
</template>

<script>
export default {
  name: "EzEditor",

  data() {
    return {
      config: {
        toolbar_mode: "sliding",
        plugins:
          "autolink emoticons image link lists searchreplace table wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        images_upload_handler: this.imageHandler,
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
      },
    };
  },
  props: ["newConfig", "value"],
  watch: {
    newConfig: {
      immediate: "true",
      handler(val) {
        this.config.toolbar.concat(val);
        console.log(this.config.toolbar, "toolbar");
      },
    },
  },
  mounted() {
    // console.log(typeof A.className);
  },
  methods: {
    imageHandler(blobInfo, success, failure, progress) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target.result;
        success(dataUrl);
      };

      reader.readAsDataURL(blobInfo.blob());
    },
  },
};
</script>
<style scoped lang="scss">
#sample {
  width: 100%;
  .tox-tinymce {
    width: 100%;
  }
}
.tox-notification--warning {
  display: none !important;
}
.tox-notifications-container {
  display: none !important;
}
</style>
