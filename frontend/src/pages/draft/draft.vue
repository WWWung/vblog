<template>
  <div class="page">
    <HeaderComponent :user="user"></HeaderComponent>
    <div class="wrap">
      <ArticleList
        :records="records"
        :clickItem="clickItem"
        :total="total"
        :page="page"
        :limit="limit"
        :handleCurrentChange="handleCurrentChange"
      ></ArticleList>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { tryLogin, dateFormat } from "@/utils/utils";
import ArticleList from "@/components/articleList.vue";
import HeaderComponent from "@/components/header.vue";
export default {
  data() {
    return {
      user: "",
      records: [],
      total: 0,
      page: 1,
      limit: 15
    };
  },
  components: {
    ArticleList,
    HeaderComponent
  },
  methods: {
    getArticleList() {
      this.$post("/api/article/batchGet", {
        limit: this.limit,
        page: this.page,
        where: {
          status: 10,
          userName: this.user
        }
      }).then(rsl => {
        console.log(rsl);
        this.records = rsl.data.records;
        this.total = rsl.data.total;
      });
    },
    async getUserInfo() {
      const rsl = await tryLogin.call(this, true);
      console.log(rsl);
      if (rsl) {
        this.user = rsl.data.user;
        this.getArticleList();
      }
    },
    clickItem(id) {
      console.log(id);
      window.open(`/write.html?id=${id}`);
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getArticleList();
    }
  },
  async mounted() {
    this.getUserInfo();
  }
};
</script>

<style scoped lang="less">
</style>
