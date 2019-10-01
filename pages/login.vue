<template>
  <div>
    <p>
      <strong v-if="errorAlert.length > 0">{{errorAlert}}</strong>
    </p>
    <a-button icon="google" type="primary" @click="onLogin">Login</a-button>
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
import { fa, GoogleProvider, fs } from "~/plugins/firebase";
import * as firebase from "firebase";

const authenticationAlertsStore = namespace("authenticationAlerts");
const authenticationStore = namespace("authentication");

@Component({
  layout: "login_layout"
})
export default class extends Vue {
  @authenticationAlertsStore.Getter errorAlert;
  @authenticationStore.Action login;
  async onLogin() {
    const isLoggedIn = await this.login();
    if (isLoggedIn) {
      this.$router.replace("/");
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
