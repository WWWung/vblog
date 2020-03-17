<template>
  <div class="editorWrap">
    <div class="editorToolbar"></div>
    <div
      class="editorBodyWrap"
      @click="focus"
    >
      <div
        ref="textarea"
        class="editorBody"
        contentEditable=true
      ></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    focus(e) {}
  }
};
</script>

<style scoped lang="less">
.editorWrap {
  width: 100%;
  min-width: 800px;
  height: 100%;
  min-height: 600px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.editorToolbar {
  height: 40px;
  border-bottom: 1px solid #ddd;
}
.editorBodyWrap {
  flex: 1;
  cursor: text;
  position: relative;
}
.editorBody {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: block;
  outline: none;
}
</style>
