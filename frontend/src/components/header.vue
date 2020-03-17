<template>
  <div class="header">
    <header class="header">
      <div class="headerBody">
        <div class="userInfo">
          <img
            :src="src"
            alt=""
          >
          <span>WangJian</span>
        </div>
        <nav>
          <div class="navItem">
            <a href="/index.html">主页</a>
          </div>
          <div
            v-if="user"
            class="navItem"
          >
            <a href="/draft.html">草稿箱</a>
          </div>
        </nav>
        <div class="inputWrap">
          <input
            type="text"
            placeholder="输入关键字查找相关内容"
          >
        </div>
      </div>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
import src from "@/assets/images/avator.jpg";
export default {
  data() {
    return {
      src
    };
  },
  components: {},
  props: ["user"]
};
</script>

<style scoped lang="less">
.header {
  height: 70px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
  .headerBody {
    width: 80%;
    min-width: 690px;
    max-width: 1140px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    .userInfo {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        box-shadow: 0 0 3px #ddd;
      }
      span {
        margin-left: 20px;
        font-size: 24px;
        color: #009a61;
      }
    }
    nav {
      display: flex;
      margin-left: 10px;
      margin-right: 20px;
      a {
        color: #757575;
        font-weight: 600;
        font-size: 16px;
        height: 26px;
        line-height: 26px;
        padding: 0 12px;
        display: flex;
        margin-left: 10px;
        border-radius: 4px;
        &:hover {
          background-color: #f3f3f3;
        }
      }
    }
    .inputWrap {
      width: 480px;
      height: 30px;
      margin-left: 30px;
      input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        border: 1px solid #e9ecef;
        &:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 150, 94, 0.25);
          border-color: #00c97e;
        }
        text-indent: 10px;
      }
    }
  }
}
</style>
