<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['4']">
        <a-menu-item v-for="page in pages" :key="page.name" @click="navigateTo(page.name)">
          <a-icon type="user" />
          <span class="nav-text">{{page.label}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <a-menu mode="horizontal">
          <a-sub-menu style="float: 'right'">
            <div slot="title" class="submenu-title-wrapper">
              <a-avatar :src="userInfo.photoURL" />
            </div>

            <a-menu-item key="settings">
              <span>{{userInfo.displayName}}</span>
              <a-avatar :src="userInfo.photoURL" />
            </a-menu-item>
            <a-menu-item key="logout" @click="onLogout">Logout</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <Nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
    </a-layout>
  </a-layout>
</template>


<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  State,
  Action,
  Getter,
  namespace
} from "nuxt-property-decorator";
import { plainToClass } from "class-transformer";
import { fa } from "~/plugins/firebase";
const userInfoStore = namespace("userInfo");

@Component({
  components: {}
})
export default class extends Vue {
  @userInfoStore.Getter userInfo;
  mounted() {
    console.log(
      "--------> JSON.stringify(this.userInfo, null, 2)" +
        JSON.stringify(this.userInfo, null, 2)
    );
  }
  async onLogout() {
    // try {
    await fa.signOut();
    //   // setTimeout(() => this.$router.push("login"), 3000);
    //   // fa.signOut();
    // } catch (e) {
    //   console.log("--------> e" + e);
    // }
  }
  pages = [
    {
      label: "Mentors",
      name: "mentors"
    },
    {
      label: "Organizations",
      name: "organizations"
    },
    {
      label: "Schedules",
      name: "schedules"
    }
  ];
  onCollapse(collapsed, type) {
    console.log(collapsed, type);
  }
  onBreakpoint(broken) {
    console.log(broken);
  }
  navigateTo(page: string) {
    this.$router.push(page);
  }
}
</script>

<style scope lang="scss">
#components-layout-demo-responsive {
  height: 100vh;
}
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
