<template>
  <div>
    <a-button type="primary" @click="onLogin">Login</a-button>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  State,
  Action,
  Getter,
  namespace
} from "nuxt-property-decorator";
import { plainToClass } from "class-transformer";
import { Pagination } from "ant-design-vue";
import { fa, GoogleProvider } from "~/plugins/firebase";
const mentorsStore = namespace("mentors");

@Component({
  layout: "login_layout"
})
export default class extends Vue {
  async onLogin() {
    console.log("--------> login");
    try {
      const result: any = await fa.signInWithPopup(GoogleProvider);
      var token = result.credential.accessToken;
      var user = result.user;
      this.$router.replace("/");
    } catch (e) {
      var errorCode = e.code;
      var errorMessage = e.message;
      var email = e.email;
      var credential = e.credential;
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
