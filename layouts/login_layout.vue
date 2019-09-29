<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
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

@Component({
  components: {}
})
export default class extends Vue {}
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
