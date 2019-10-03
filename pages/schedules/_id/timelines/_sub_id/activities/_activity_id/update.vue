<template>
  <a-spin :spinning="isLoading || isUpdating" :delay="0">
    <a-form :form="form" @submit="handleSubmit" v-if="activity!=null">
      <a-form-item label="Order" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'order',
          { initialValue: activity.order ,
            rules: [
          { required: true, message: 'Please input order!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'name',
          { initialValue: activity.name ,
            rules: [
          { required: true, message: 'Please input name!' }]}
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
import { Activity } from "~/modals";

const activityStore = namespace("activity");

@Component({})
export default class extends Vue {
  @activityStore.Action fetchActivity;
  @activityStore.Action updateActivity;
  @activityStore.Action deleteActivity;
  @activityStore.Getter isLoading;
  @activityStore.Getter isUpdating;
  @activityStore.Getter isDeleting;
  @activityStore.Getter activity;

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
        const activity: Activity = {
          ...this.activity,
          ...values
        };
        console.log("Received values of form: ", values);
        await this.updateActivity({
          eventDateId: this.$route.params.id,
          eventTimeId: this.$route.params.sub_id,
          id: this.$route.params.activity_id,
          activity
        });
        this.navigateToActivity(this.$route.params.id);
      }
    });
  }

  created() {
    this.form = this.$form.createForm(this);
  }
  mounted() {
    this.fetchActivity({
      eventDateId: this.$route.params.id,
      eventTimeId: this.$route.params.sub_id,
      id: this.$route.params.activity_id
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
      onOk: this.onDeleteActivity,
      onCancel: () => {}
    });
  }
  async onDeleteActivity() {
    const isSuccess: boolean = await this.deleteActivity({
      eventDateId: this.$route.params.id,
      eventTimeId: this.$route.params.sub_id,
      id: this.$route.params.activity_id
    });
    if (isSuccess) this.navigateToActivities();
  }
  navigateToActivity(id: string) {
    this.$router.push({
      name: "schedules-id-timelines-sub_id-activities-activity_id",
      params: this.$route.params
    });
  }
  navigateToActivities() {
    this.$router.push({
      name: "schedules-id-timelines-sub_id",
      params: { id: this.$route.params.id, sub_id: this.$route.params.sub_id }
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