<template>
  <a-spin :spinning="isCreating">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'name',
          { 
            rules: [
          { required: true, message: 'Please input name!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="From" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-time-picker v-decorator="['from', config]" />
      </a-form-item>

      <a-form-item label="To" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-time-picker v-decorator="['to', config]" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">Create</a-button>
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
  @eventTimeStore.Action createEventTime;
  @eventTimeStore.Getter isCreating;

  formLayout = "horizontal";
  form: any;

  async handleSubmit(e) {
    e.preventDefault();
    this.submit();
  }
  submit() {
    this.form.validateFields(async (err, values) => {
      const eventTime: EventTime = {
        ...values,
        from: values.from.toDate(),
        to: values.to.toDate()
      };
      const id: string = await this.createEventTime({
        eventDateId: this.$route.params.id,
        eventTime
      });
      this.navigateToEventTime(id);
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }

  navigateToEventTime(id: string) {
    this.$router.push({
      name: "schedules-id-timelines-sub_id",
      params: { id: this.$route.params.id, sub_id: id }
    });
  }

  created() {
    this.form = this.$form.createForm(this);
  }
}
</script>

<style scoped>
.danger-wrapper {
  display: inherit;
  margin-left: 10px;
}
</style>