<template>
  <Nuxt />
</template>


<script lang="ts">
import { Component, Vue, Watch, State, Action, Getter, namespace  } from "nuxt-property-decorator";
import { plainToClass } from "class-transformer";


@Component({
  components: {
  },
})
export default class DefaultLayout extends Vue {
}
</script>

<style scope lang="scss">
</style>
