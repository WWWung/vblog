<template>
  <div class="page">
    <div
      class="wrap"
      @keydown="keyTologinIn"
    >
      <input
        type="text"
        class="user input"
        placeholder="用户名"
        v-model="user"
      >
      <input
        type="password"
        class="password input"
        placeholder="密码"
        v-model="password"
      >
      <input
        type="button"
        class="ok"
        value="登录"
        @click="loginIn"
      >
      <span>
        若用户名不存在，将直接创建
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { setLocalStorage, parseQueryString, tryLogin } from "@/utils/utils";
export default {
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    loginIn() {
      const { user, password } = this;
      if (!user) {
        return this.$message("请输入用户名");
      }
      if (!password) {
        return this.$message("请输入密码");
      }
      this.$post("/api/user/loginIn", {
        password,
        user
      }).then(rsl => {
        setLocalStorage("token", rsl.data);
        const prevUrl = parseQueryString()["prevUrl"];
        window.location.href = prevUrl || "index.html";
      });
    },
    keyTologinIn(e) {
      // console.log(e);
      if (e.keyCode === 13) {
        this.loginIn();
      }
    }
  },
  components: {},
  async mounted() {
    const rsl = await tryLogin.call(this, false);
    if (rsl && rsl.data) {
      window.location.href = "/index.html";
    }
  }
};
</script>

<style scoped lang="less">
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9ecef;
}
.wrap {
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  span {
    line-height: 40px;
    font-size: 12px;
    margin-top: 15px;
  }
  input {
    height: 40px;
    margin-top: 15px;
    border-radius: 2px;
  }
  .input {
    border: 1px solid #ddd;
    text-indent: 5px;
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 150, 94, 0.25);
      border-color: #00c97e;
    }
  }
  .ok {
    background-color: #67c23a;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #85ce61;
    }
  }
}
</style>
