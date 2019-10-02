<template>
  <div>
    <a-spin :spinning="isLoading" :delay="0">
      <div v-if="!isLoading" class="info">
        <h5>Order:</h5>
        <p>{{organizationType.order}}</p>
        <h5>Type:</h5>
        <p>{{organizationType.type}}</p>
        <p></p>
      </div>
      <a-button @click="onNavigateEdit">Edit</a-button>
    </a-spin>
    <hr />
    <p>Organizations</p>
    <v-organizations></v-organizations>
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
import VOrganizations from "~/components/organizations.vue";

const organizationTypeStore = namespace("organizationType");

@Component({
  components: {
    VOrganizations
  }
})
export default class extends Vue {
  @organizationTypeStore.Action fetchOrganizationType;
  @organizationTypeStore.Getter isLoading;
  @organizationTypeStore.Getter organizationType;
  mounted() {
    this.fetchOrganizationType(this.$route.params.id);
  }
  onNavigateEdit() {
    this.$router.push({
      name: "organizationTypes-id-update",
      params: this.$route.params
    });
  }
}
</script>

<style scoped>
.info {
  margin-bottom: 30px;
}
</style>