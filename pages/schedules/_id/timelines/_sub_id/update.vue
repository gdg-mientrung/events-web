<template>
  <a-spin :spinning="isLoading || isUpdating" :delay="0">
    <a-form :form="form" @submit="handleSubmit" v-if="eventTime!=null">
      <a-form-item label="Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'name',
          { initialValue: eventTime.name ,
            rules: [
          { required: true, message: 'Please input name!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="From" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-time-picker
          v-decorator="[
          'from',
          { initialValue: eventTime.from ,
            rules: [
          { type: 'object', required: true, message: 'Please select time!' }]}
        ]"
        />
      </a-form-item>
      <a-form-item label="To" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-time-picker
          v-decorator="[
          'to',
          { initialValue: eventTime.to ,
            rules: [
          { type: 'object', required: true, message: 'Please select time!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">Edit</a-button>
        <a-button class="danger-wrapper" type="danger" @click.prevent="onDelete">Delete</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  State,
  Action,
  Getter,
  namespace,
  Watch
} from "nuxt-property-decorator";
import { plainToClass } from "class-transformer";
import { Form } from "ant-design-vue";
import { st } from "~/plugins/firebase";
import * as firebase from "firebase/app";
import { EventTime } from "~/modals";

const eventTimeStore = namespace("eventTime");

@Component({})
export default class extends Vue {
  @eventTimeStore.Action fetchEventTime;
  @eventTimeStore.Action updateEventTime;
  @eventTimeStore.Action deleteEventTime;
  @eventTimeStore.Getter isLoading;
  @eventTimeStore.Getter isUpdating;
  @eventTimeStore.Getter isDeleting;
  @eventTimeStore.Getter eventTime;

  formLayout = "horizontal";
  form: any;

  async handleSubmit(e) {
    e.preventDefault();
    this.$confirm({
      title: "Do you want to update?",
      content: "This cannot be undone",
      onOk: () => {
        this.submit();
      },
      onCancel: () => {}
    });
  }
  submit() {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(
          "--------> JSON.stringify(values, null, 2)" +
            JSON.stringify(values, null, 2)
        );
        const eventTime: EventTime = {
          ...this.eventTime,
          ...values,
          ...{ ...values, from: values.from.toDate(), to: values.to.toDate() }
        };
        console.log("Received values of form: ", values);
        await this.updateEventTime({
          eventDateId: this.$route.params.id,
          id: this.$route.params.sub_id,
          eventTime
        });
        this.navigateToEventTime(this.$route.params.id);
      }
    });
  }

  created() {
    this.form = this.$form.createForm(this);
  }
  mounted() {
    this.fetchEventTime({
      eventDateId: this.$route.params.id,
      id: this.$route.params.sub_id
    });
  }
  onDelete() {
    this.showDeleteConfirm();
  }
  showDeleteConfirm() {
    this.$confirm({
      title: "Are you sure to delete ?",
      content: "This cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: this.onDeleteEventTime,
      onCancel: () => {}
    });
  }
  async onDeleteEventTime() {
    const isSuccess: boolean = await this.deleteEventTime({
      eventDateId: this.$route.params.id,
      id: this.$route.params.sub_id
    });
    if (isSuccess) this.navigateToEventTimes();
  }
  navigateToEventTime(id: string) {
    this.$router.push({
      name: "schedules-id-timelines-sub_id",
      params: this.$route.params
    });
  }
  navigateToEventTimes() {
    this.$router.push({
      name: "schedules-id",
      params: { id: this.$route.params.id }
    });
  }
}
</script>

<style scoped>
.danger-wrapper {
  display: inherit;
  margin-left: 10px;
}
</style>