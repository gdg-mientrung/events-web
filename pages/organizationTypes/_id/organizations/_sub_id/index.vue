<template>
  <div>
    <a-button @click="onNavigateToOrganizations">Back organizations</a-button>
    <hr>
    <a-spin :spinning="isLoading" :delay="0">
      <div v-if="!isLoading" class="info">
        <h5>Name:</h5>
        <p>{{organization.name}}</p>
        <p></p>
        <h5>Photo:</h5>
        <div>
          <img :src="organization.photo_url" :alt="organization.photo_url" class="avatar-image" />
        </div>
      </div>
      <a-button @click="onNavigateEdit">Edit</a-button>
    </a-spin>
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
const organizationStore = namespace("organization");

@Component({})
export default class extends Vue {
  @organizationStore.Action fetchOrganization;
  @organizationStore.Getter isLoading;
  @organizationStore.Getter organization;
  mounted() {
    this.fetchOrganization({
      typeId: this.$route.params.id,
      id: this.$route.params.sub_id
    });
  }
  onNavigateEdit() {
    this.$router.push({
      name: "organizationTypes-id-organizations-sub_id-update",
      params: this.$route.params
    });
  }
  onNavigateToOrganizations() {
    this.$router.push({
      name: "organizationTypes-id",
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