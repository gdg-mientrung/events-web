<template>
  <div>
    <a-spin :spinning="isLoading" :delay="0">
      <div v-if="!isLoading" class="info">
        <h5>Order:</h5>
        <p>{{mentor.order}}</p>
        <h5>Name:</h5>
        <p>{{mentor.name}}</p>
        <h5>Title:</h5>
        <p>{{mentor.title}}</p>
        <p></p>
        <h5>Avatar:</h5>
        <div>
          <img :src="mentor.photo_url" :alt="mentor.photo_url" class="avatar-image" />
        </div>
      </div>
      <a-button @click="onNavigateEdit">Edit</a-button>
    </a-spin>
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
  onNavigateEdit() {
    this.$router.push({
      name: "mentors-id-update",
      params: { id: this.$route.params.id }
    });
  }
}
</script>

<style scoped>
.info {
  margin-bottom: 30px;
}
</style>