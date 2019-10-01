<template>
  <div>
    <a-button html-type="submit" @click="onNavigateCreate">Create</a-button>
    <a-table
      :columns="columns"
      :rowKey="mentor => mentor.id"
      :dataSource="mentors"
      :pagination="pagination"
      :loading="isLoading"
      @change="handleTableChange"
      :customRow="customRow"
      :scroll="{ x: true}"
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
const mentorsStore = namespace("mentors");

const initialSorter = {
  column: {
    title: "Order",
    dataIndex: "order",
    sorter: true,
    defaultSortOrder: "ascend"
  },
  order: "ascend",
  field: "order",
  columnKey: "order"
};

@Component({})
export default class extends Vue {
  @mentorsStore.Action fetchMentors;
  @mentorsStore.Getter isLoading;
  @mentorsStore.Getter mentors;

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
      scopedSlots: { customRender: "id" },
      fixed: "left"
    },
    {
      title: "Order",
      dataIndex: "order",
      sorter: true,
      defaultSortOrder: "ascend"
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true
    },
    {
      title: "Title",
      sorter: true,
      dataIndex: "title"
    },
    {
      title: "Avatar",
      dataIndex: "photo_url",
      scopedSlots: { customRender: "photo_url" }
    }
  ];
  customRow(record) {
    return {
      on: {
        click: () => this.navigateToMentor(record.id)
      }
    };
  }

  navigateToMentor(id: string) {
    this.$router.push({
      name: "mentors-id",
      params: { id }
    });
  }

  onNavigateCreate() {
    this.$router.push({
      name: "mentors-create"
    });
  }
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  mounted() {
    this.fetchMentors({
      pagination: this.pagination,
      sorter: initialSorter
    });
  }
  handleTableChange(pagination, filters, sorter) {
    this.fetchMentors({ pagination, filters, sorter });
  }
}
</script>

<style scoped>
</style>