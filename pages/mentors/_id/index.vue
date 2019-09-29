<template>
  <div>
    <h5>Name:</h5>
    <p>{{mentor.name}}</p>
    <h5>Title:</h5>
    <p>{{mentor.title}}</p>
    <p></p>
    <h5>Photo:</h5>
    <p>{{mentor.photo_url}}</p>
    <p></p>
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
const mentorStore = namespace("mentor");

@Component({})
export default class extends Vue {
  @mentorStore.Action fetchMentor;
  @mentorStore.Getter isLoading;
  @mentorStore.Getter mentor;
  mounted() {
    this.fetchMentor(this.$route.params.id);
  }
}
</script>

<style>
</style>