<template>
  <a-spin :spinning="isCreating">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Order" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input-number
          v-decorator="['order', { initialValue: 0,  rules: [
          { required: true, message: 'Please input order!' }] }]"
          :min="1"
          :max="10"
        />
      </a-form-item>
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
import { Activity } from "~/modals";

const activityStore = namespace("activity");

@Component({})
export default class extends Vue {
  @activityStore.Action createActivity;
  @activityStore.Getter isCreating;

  formLayout = "horizontal";
  form: any;

  async handleSubmit(e) {
    e.preventDefault();
    this.submit();
  }
  submit() {
    this.form.validateFields(async (err, values) => {
      const activity: Activity = {
        ...values
      };
      const id: string = await this.createActivity({
        eventDateId: this.$route.params.id,
        eventTimeId: this.$route.params.sub_id,
        activity
      });
      this.navigateToActivity(id);
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }

  navigateToActivity(id: string) {
    this.$router.push({
      name: "schedules-id-timelines-sub_id-activities-activity_id",
      params: {
        id: this.$route.params.id,
        sub_id: this.$route.params.sub_id,
        activity_id: id
      }
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