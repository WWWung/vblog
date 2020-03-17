<template>
  <div class="page">
    <article
      class="article"
      v-html="content"
    >
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: ["content"],
  components: {}
};
</script>

<style scoped lang="less">
.page {
  height: 100%;
  overflow-y: auto;
}
</style>
