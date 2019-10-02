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

      <a-form-item label="Date"  :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-date-picker v-decorator="['date', config]" />
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
import { EventDate } from "~/modals";

const eventDateStore = namespace("eventDate");

@Component({})
export default class extends Vue {
  @eventDateStore.Action createEventDate;
  @eventDateStore.Getter isCreating;

  formLayout = "horizontal";
  form: any;

  config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }]
  };
  async handleSubmit(e) {
    e.preventDefault();
    this.submit();
  }
  submit() {
    this.form.validateFields(async (err, values) => {
      const eventDate: EventDate = {
        ...values,
        date: values.date.toDate()
      };
      const id: string = await this.createEventDate(eventDate);
      this.navigateToEventDate(id);
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }

  navigateToEventDate(id: string) {
    this.$router.push({
      name: "schedules-id",
      params: { id }
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