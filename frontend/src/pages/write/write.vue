<template>
  <div class="wrap">
    <header class="header"></header>
    <div class="page">
      <div class="left">
        <Editor
          :catchData="catchData"
          :content="content"
        ></Editor>
      </div>
      <div class="right">
        <Preview :content="content"></Preview>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Editor from "../../components/wangEditor.vue";
import Preview from "../../components/preview.vue";
export default {
  data() {
    return {
      content: "WangJian"
    };
  },
  components: {
    Editor,
    Preview
  },
  methods: {
    catchData(text) {
      this.content = text;
    }
  }
};
</script>

<style scoped lang="css">
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page {
  display: flex;
  width: 80%;
}
.header {
  height: 80px;
}
.left {
  width: 50%;
  min-width: 700px;
}
.right {
  flex: 1;
}
</style>
