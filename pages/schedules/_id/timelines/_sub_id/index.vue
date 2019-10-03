<template>
  <div>
    <a-button @click="onNavigateToEventTimes">Back eventTimes</a-button>
    <hr />
    <a-spin :spinning="isLoading" :delay="0">
      <div v-if="!isLoading" class="info">
        <h5>Name:</h5>
        <p>{{eventTime.name}}</p>
        <p></p>
        <h5>From:</h5>
        <p v-if="typeof(eventTime.from.format) === 'function'">{{eventTime.from.format('LT')}}</p>
        <h5>To:</h5>
        <p v-if="typeof(eventTime.to.format) === 'function'">{{eventTime.to.format('LT')}}</p>
      </div>
      <a-button @click="onNavigateEdit">Edit</a-button>
    </a-spin>
    <hr />
    <p>Timeline</p>
    <v-activities></v-activities>
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
import VActivities from "~/components/activities.vue";
const eventTimeStore = namespace("eventTime");

@Component({
  components: { VActivities }
})
export default class extends Vue {
  @eventTimeStore.Action fetchEventTime;
  @eventTimeStore.Getter isLoading;
  @eventTimeStore.Getter eventTime;
  mounted() {
    this.fetchEventTime({
      eventDateId: this.$route.params.id,
      id: this.$route.params.sub_id
    });
  }
  onNavigateEdit() {
    this.$router.push({
      name: "schedules-id-timelines-sub_id-update",
      params: this.$route.params
    });
  }
  onNavigateToEventTimes() {
    this.$router.push({
      name: "schedules-id",
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