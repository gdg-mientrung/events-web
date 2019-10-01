<template>
  <a-spin :spinning="isLoading || isUpdating" :delay="0">
    <a-form :form="form" @submit="handleSubmit" v-if="organizationType!=null">
      <a-form-item label="Order" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'order',
          { initialValue: organizationType.order ,
            rules: [
          { required: true, message: 'Please input order!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="Type" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'type',
          { initialValue: organizationType.type ,
            rules: [{ required: true, message: 'Please input type!' }]}
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
import { OrganizationType } from "~/modals";

const organizationTypeStore = namespace("organizationType");

@Component({})
export default class extends Vue {
  @organizationTypeStore.Action fetchOrganizationType;
  @organizationTypeStore.Action updateOrganizationType;
  @organizationTypeStore.Action deleteOrganizationType;
  @organizationTypeStore.Getter isLoading;
  @organizationTypeStore.Getter isUpdating;
  @organizationTypeStore.Getter isDeleting;
  @organizationTypeStore.Getter organizationType;

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
        const organizationType: OrganizationType = {
          ...this.organizationType,
          ...values
        };
        console.log("Received values of form: ", values);
        await this.updateOrganizationType({
          id: this.$route.params.id,
          organizationType
        });
        this.navigateToOrganizationType(this.$route.params.id);
      }
    });
  }

  created() {
    this.form = this.$form.createForm(this);
  }
  mounted() {
    this.fetchOrganizationType(this.$route.params.id);
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
      onOk: this.onDeleteOrganizationType,
      onCancel: () => {}
    });
  }
  async onDeleteOrganizationType() {
    const isSuccess: boolean = await this.deleteOrganizationType(
      this.$route.params.id
    );
    if (isSuccess) this.navigateToOrganizationTypes();
  }
  navigateToOrganizationType(id: string) {
    this.$router.push({
      name: "organizations-id",
      params: { id }
    });
  }
  navigateToOrganizationTypes() {
    this.$router.push({
      name: "organizations"
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