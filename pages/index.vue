<template>
  <div>
   Hello world
  </div>
</template>

<script lang="ts">

import {Vue, Component, State, Action, Getter, namespace } from "nuxt-property-decorator";
import { plainToClass } from "class-transformer";


@Component({
  components: {
  }
})
export default class Index extends Vue {
}
</script>

<style scoped lang='scss'>

</style>
