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

      <a-form-item label="Type" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'type',
          { 
            rules: [{ required: true, message: 'Please input type!' }]}
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
import { OrganizationType } from "~/modals";

const organizationTypeStore = namespace("organizationType");

@Component({})
export default class extends Vue {
  @organizationTypeStore.Action createOrganizationType;
  @organizationTypeStore.Getter isCreating;
  form: any;
  async handleSubmit(e) {
    e.preventDefault();
    this.submit();
  }

  submit() {
    this.form.validateFields(async (err, values) => {
      const organizationType: OrganizationType = {
        ...values
      };
      const id: string = await this.createOrganizationType(organizationType);
      this.navigateToOrganizationType(id);
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }

  navigateToOrganizationType(id: string) {
    this.$router.push({
      name: "organizations-id",
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