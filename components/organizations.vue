<template>
  <div>
    <a-button html-type="submit" @click="onNavigateCreate">Create</a-button>
    <a-table
      :columns="columns"
      :rowKey="organization => organization.id"
      :dataSource="organizations"
      :pagination="pagination"
      :loading="isLoading"
      @change="handleTableChange"
      :customRow="customRow"
    >
      <template slot="id" slot-scope="id">{{id.substring(0, 6) + '...'}}</template>
      <template slot="photo_url" slot-scope="photo_url">
        <img
          v-if="photo_url.length > 0"
          :src="photo_url"
          :alt="photo_url"
          class="avatar-image-small"
        />
        <span v-else>null</span>
      </template>
    </a-table>
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
const organizationsStore = namespace("organizations");

@Component({})
export default class extends Vue {
  @organizationsStore.Action fetchOrganizations;
  @organizationsStore.Getter isLoading;
  @organizationsStore.Getter organizations;

  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "15", "20", "50", "100"],
    showTotal: total => `Total ${total} items`
  };
  columns: any[] = [
    {
      title: "Id",
      dataIndex: "id",
      scopedSlots: { customRender: "id" }
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true
    },
    {
      title: "Photo",
      dataIndex: "photo_url",
      scopedSlots: { customRender: "photo_url" }
    }
  ];
  customRow(record) {
    return {
      on: {
        click: () => this.navigateToOrganization(record.id)
      }
    };
  }

  navigateToOrganization(id: string) {
    this.$router.push({
      name: "organizationTypes-id-organizations-sub_id",
      params: { id: this.$route.params.id, sub_id: id }
    });
  }

  onNavigateCreate() {
    this.$router.push({
      name: "organizationTypes-id-organizations-create",
      params: this.$route.params
    });
  }
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  mounted() {
    this.fetchOrganizations({
      typeId: this.$route.params.id,
      pagination: this.pagination
    });
  }
  handleTableChange(pagination, filters, sorter) {
    this.fetchOrganizations({
      typeId: this.$route.params.id,
      pagination,
      filters,
      sorter
    });
  }
}
</script>

<style scoped>
</style>