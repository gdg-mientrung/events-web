<template>
  <div>
    <a-spin :spinning="isLoading" :delay="0">
      <div v-if="!isLoading" class="info">
        <h5>Name:</h5>
        <p>{{eventDate.name}}</p>
        <h5>Date:</h5>
        <p v-if="typeof(eventDate.date.format) === 'function'">{{eventDate.date.format('L')}}</p>
        <p></p>
      </div>
      <a-button @click="onNavigateEdit">Edit</a-button>
    </a-spin>
    <hr />
    <p>Timeline</p>
    <v-event-times></v-event-times>
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
import VEventTimes from "~/components/eventTimes.vue";
const eventDateStore = namespace("eventDate");

@Component({
  components: { VEventTimes }
})
export default class extends Vue {
  @eventDateStore.Action fetchEventDate;
  @eventDateStore.Getter isLoading;
  @eventDateStore.Getter eventDate;
  mounted() {
    this.fetchEventDate(this.$route.params.id);
  }
  onNavigateEdit() {
    this.$router.push({
      name: "schedules-id-update",
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