<template>
  <div class="listPage">
    <div class="listWrap">
      <ul>
        <li
          :key="index"
          v-for="(record, index) in records"
          @click="clickItem(record.id)"
        >
          <div class="articleTitle">
            {{record.title}}
          </div>
          <time>
            {{date(record.updatedAt)}}
          </time>
        </li>
      </ul>
    </div>
    <el-pagination
      layout="pager"
      :total="total"
      :current-page="page"
      :page-size="limit"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { tryLogin, dateFormat } from "@/utils/utils";
export default {
  data() {
    return {};
  },
  components: {},
  props: [
    "records",
    "clickItem",
    "total",
    "page",
    "limit",
    "handleCurrentChange"
  ],
  computed: {
    date() {
      return dateFormat;
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.listPage {
  height: 100%;
  box-sizing: border-box;
  padding-top: 30px;
}
.listWrap {
  height: calc(100% - 32px);
  overflow-y: auto;
  ul {
    padding: 10px;
  }
  li {
    height: 60px;
    display: flex;
    align-items: center;
    border-radius: 2px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 3px 3px rgba(0, 150, 94, 0.25);
      border-color: #00c97e;
      transform: skew(-10deg);
    }
    .articleTitle {
      font-size: 22px;
      flex: 1;
      overflow: hidden;
      text-overflow: initial;
      white-space: nowrap;
      box-sizing: border-box;
      padding: 0 10px;
    }
    time {
      font-size: 14px;
      width: 130px;
      text-align: center;
    }
  }
}
</style>
