<template>
  <div class="page">
    <div>
      <HeaderComponent :user="user" />
    </div>
    <article class="main">
      <h1 class="articleTitle">{{title}}</h1>
      <div class="timeInfo">
        创建于 {{createdAt}} ,
        最后更新于 {{updatedAt}}
      </div>
      <div
        class="article markdown-body"
        v-html="htmlContent"
      >

      </div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderComponent from "@/components/header.vue";
import { dateFormat, parseQueryString, tryLogin } from "@/utils/utils";
import hljs from "highlight.js";
import mdIt from "markdown-it";
export default {
  data() {
    return {
      title: "",
      htmlContent: "",
      user: "",
      createdAt: "",
      updatedAt: ""
    };
  },
  components: {
    HeaderComponent
  },
  methods: {
    get() {
      const id = parseQueryString().id;
      if (!id) {
        return;
      }
      this.id = id;
      this.$post(`/api/article/get`, {
        id
      }).then(rsl => {
        if (!rsl.data) {
          return;
        }
        const md = mdIt({
          highlight: function(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value;
              } catch (__) {}
            }

            return ""; // 使用额外的默认转义
          }
        });
        this.htmlContent = md.render(rsl.data.mdContent);
        this.title = rsl.data.title;
        document.querySelector("title").innerHTML = this.title;
        this.createdAt = dateFormat(rsl.data.createdAt, "YYYY-mm-dd HH:MM");
        this.updatedAt = dateFormat(rsl.data.updatedAt, "YYYY-mm-dd HH:MM");
      });
    },
    async getUserInfo() {
      const rsl = await tryLogin.call(this, false);
      console.log(rsl);
      if (rsl) {
        this.user = rsl.data.user;
      }
    }
  },
  mounted() {
    this.get();
    this.getUserInfo();
  }
};
</script>

<style scoped lang="less">
</style>
