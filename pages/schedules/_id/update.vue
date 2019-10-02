<template>
  <a-spin :spinning="isLoading || isUpdating" :delay="0">
    <a-form :form="form" @submit="handleSubmit" v-if="eventDate!=null">
      <a-form-item label="Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'name',
          { initialValue: eventDate.name ,
            rules: [
          { required: true, message: 'Please input name!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="Date" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
         <a-date-picker
          v-decorator="[
          'date',
          { initialValue: eventDate.date ,
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
import { EventDate } from "~/modals";

const eventDateStore = namespace("eventDate");

@Component({})
export default class extends Vue {
  @eventDateStore.Action fetchEventDate;
  @eventDateStore.Action updateEventDate;
  @eventDateStore.Action deleteEventDate;
  @eventDateStore.Getter isLoading;
  @eventDateStore.Getter isUpdating;
  @eventDateStore.Getter isDeleting;
  @eventDateStore.Getter eventDate;

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
        const eventDate: EventDate = {
          ...this.eventDate,
          ...{ ...values, date: values.date.toDate() }
        };
        console.log("Received values of form: ", values);
        await this.updateEventDate({ id: this.$route.params.id, eventDate });
        this.navigateToEventDate(this.$route.params.id);
      }
    });
  }

  created() {
    this.form = this.$form.createForm(this);
  }
  mounted() {
    this.fetchEventDate(this.$route.params.id);
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
      onOk: this.onDeleteEventDate,
      onCancel: () => {}
    });
  }
  async onDeleteEventDate() {
    const isSuccess: boolean = await this.deleteEventDate(
      this.$route.params.id
    );
    if (isSuccess) this.navigateToEventDates();
  }
  navigateToEventDate(id: string) {
    this.$router.push({
      name: "schedules-id",
      params: { id }
    });
  }
  navigateToEventDates() {
    this.$router.push({
      name: "schedules"
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