<template>
  <div class="page">
    <div class="wrap">
      <input
        type="text"
        class="titleInput"
        v-model="title"
      >
      <span class="status">{{ this.id ? (isSaving ? "保存中..." : "已保存为草稿") : ""}}</span>
      <MdEditor
        :submit="submit"
        :change="change"
        :defaultValue="mdContent"
      > </MdEditor>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MdEditor from "../../components/mdEditor.vue";
import { tryLogin, parseQueryString } from "@/utils/utils";
export default {
  data() {
    return {
      title: "请输入文章标题",
      mdContent: "",
      htmlContent: "",
      id: "",
      isSaving: false,
      timer: null,
      user: ""
    };
  },
  components: {
    MdEditor
  },
  methods: {
    submit() {
      this.save(20);
    },
    change(mdContent, htmlContent) {
      this.isSaving = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.save();
      }, 1000);
      this.mdContent = mdContent;
      this.htmlContent = htmlContent;
    },
    save(status = 10) {
      const data = {
        mdContent: this.mdContent,
        htmlContent: this.htmlContent,
        title: this.title,
        status
      };
      let method = "add";
      if (this.id) {
        method = "update";
        data.id = this.id;
      }
      this.$post(`/api/article/${method}`, data).then(rsl => {
        this.isSaving = false;
        if (!this.id) {
          this.id = rsl.data.id;
        }
        if (status !== 10) {
          this.$message({
            message: "发布成功!",
            type: "success"
          });
        }
      });
    },
    get() {
      const id = parseQueryString().id;
      if (!id) {
        return;
      }
      this.id = id;
      this.$post(`/api/article/get`, {
        id
      }).then(rsl => {
        console.log(rsl);
        if (rsl.data) {
          if (rsl.data.userName !== this.user) {
            window.location.href = "/index.html";
            return;
          }
          this.mdContent = rsl.data.mdContent;
          this.title = rsl.data.title;
          document.querySelector("title").innerHTML = this.title;
        }
      });
    }
  },
  async mounted() {
    const rsl = await tryLogin.call(this, true);
    if (rsl.data) {
      this.user = rsl.data.user;
      this.get();
    }
    console.log(rsl);
  }
};
</script>

<style scoped lang="less">
.titleInput {
  width: 100%;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 0 10px;
  background-color: #fff;
  border: 1px solid #ced4da;
  height: 52px;
  line-height: 52px;
  font-size: 20px;
  border-radius: 2px;
  color: #2c3e50;
}
.page {
  display: flex;
  justify-content: center;
}
.wrap {
  width: 80%;
  max-width: 1000px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
}
.status {
  line-height: 40px;
  font-size: 12;
  color: #6c757d;
  height: 40px;
}
</style>
