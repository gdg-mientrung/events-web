<template>
  <div>
    <a-button html-type="submit" @click="onNavigateCreate">Create</a-button>
    <a-table
      :columns="columns"
      :rowKey="activity => activity.id"
      :dataSource="activities"
      :pagination="pagination"
      :loading="isLoading"
      @change="handleTableChange"
      :customRow="customRow"
    >
      <template slot="id" slot-scope="id">{{id.substring(0, 6) + '...'}}</template>
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
const activitiesStore = namespace("activities");

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
  @activitiesStore.Action fetchActivities;
  @activitiesStore.Getter isLoading;
  @activitiesStore.Getter activities;

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
      title: "Order",
      dataIndex: "order",
      sorter: true,
      defaultSortOrder: "ascend"
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true
    }
  ];
  customRow(record) {
    return {
      on: {
        click: () => this.navigateToActivity(record.id)
      }
    };
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

  onNavigateCreate() {
    this.$router.push({
      name: "schedules-id-timelines-sub_id-activities-create",
      params: this.$route.params
    });
  }
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  mounted() {
    this.fetchActivities({
      eventDateId: this.$route.params.id,
      eventTimeId: this.$route.params.sub_id,
      pagination: this.pagination,
      sorter: initialSorter
    });
  }
  handleTableChange(pagination, filters, sorter) {
    this.fetchActivities({
      eventDateId: this.$route.params.id,
      eventTimeId: this.$route.params.sub_id,
      pagination,
      filters,
      sorter
    });
  }
}
</script>

<style scoped>
</style>