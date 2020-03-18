<template>
  <div class="editorWrap">
    <mavon-editor
      v-model="value"
      ref="md"
      :toolbars="config.toolbars"
      @change="change"
      @save="submit"
      @imgAdd="imgAdd"
      :codeStyle="'github'"
      style="min-height: 600px"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { apiPrefix } from "@/config/config.js";

export default {
  // 注册
  components: {
    mavonEditor
  },
  data() {
    return {
      config: {
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          alignleft: true,
          aligncenter: true,
          alignright: true,
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          subfield: true, // 是否需要分栏
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: false, // 帮助
          save: true
        }
      },
      content: "", // 输入的markdown
      html: "" // 及时转的html,
    };
  },
  props: ["change", "submit", "defaultValue"],
  mounted() {},
  methods: {
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      this.$post("/api/file/uploadFile", formdata).then(res => {
        console.log(res);
        this.$refs.md.$img2Url(pos, `${apiPrefix}${res.data.url}`);
      });
    }
  },
  computed: {
    value: {
      get() {
        return this.defaultValue;
      },
      set() {}
    }
  }
};
</script>

<style scoped lang="less">
</style>
