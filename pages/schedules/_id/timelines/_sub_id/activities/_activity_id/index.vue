<template>
  <div>
    <a-spin :spinning="isLoading" :delay="0">
      <div v-if="!isLoading && activity" class="info">
        <h5>Order:</h5>
        <p>{{activity.order}}</p>
        <h5>Name:</h5>
        <p>{{activity.name}}</p>
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
const activityStore = namespace("activity");

@Component({})
export default class extends Vue {
  @activityStore.Action fetchActivity;
  @activityStore.Getter isLoading;
  @activityStore.Getter activity;
  mounted() {
    this.fetchActivity({
      eventDateId: this.$route.params.id,
      eventTimeId: this.$route.params.sub_id,
      id: this.$route.params.activity_id
    });
  }
  onNavigateEdit() {
    this.$router.push({
      name: "schedules-id-timelines-sub_id-activities-activity_id-update",
      params: this.$route.params
    });
  }
}
</script>

<style scoped>
.info {
  margin-bottom: 30px;
}
</style>