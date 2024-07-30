<template>
  <main id="sample">
    <Editor
      api-key="46auy8pyr9e6dp5fpimr0lkujgjuccumkby3w9n3hs1x0yco"
      :id="editorId"
      :init="config"
      v-model="editorData"
    />
  </main>
</template>

<script>
export default {
  name: "TextEditor",
  props: {
    newConfig: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: () => `editor-${Math.random().toString(36).substring(2, 15)}`,
    },
  },
  data() {
    return {
      editorData: this.value,
      editorId: this.id,
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
  watch: {
    newConfig: {
      immediate: true,
      handler(val) {
        this.config.toolbar = this.config.toolbar.concat(val);
        console.log(this.config.toolbar, "toolbar");
      },
    },
    value(newValue) {
      if (newValue !== this.editorData) {
        this.editorData = newValue;
      }
    },
    editorData(newValue) {
      this.$emit("input", newValue);
    },
  },
  beforeDestroy() {
    const editor = tinymce.get(this.editorId);
    if (editor) {
      editor.remove();
    }
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
