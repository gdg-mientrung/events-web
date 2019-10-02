<template>
  <div>
    <a-button html-type="submit" @click="onNavigateCreate">Create</a-button>
    <a-table
      :columns="columns"
      :rowKey="eventTime => eventTime.id"
      :dataSource="eventTimes"
      :pagination="pagination"
      :loading="isLoading"
      @change="handleTableChange"
      :customRow="customRow"
    >
      <template slot="id" slot-scope="id">{{id.substring(0, 6) + '...'}}</template>
      <template slot="from" slot-scope="from">{{from.format('LT')}}</template>
      <template slot="to" slot-scope="to">{{to.format('LT')}}</template>
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
const eventTimesStore = namespace("eventTimes");

@Component({})
export default class extends Vue {
  @eventTimesStore.Action fetchEventTimes;
  @eventTimesStore.Getter isLoading;
  @eventTimesStore.Getter eventTimes;

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
      title: "From",
      dataIndex: "from",
      sorter: true,
      defaultSortOrder: "ascend",
      scopedSlots: { customRender: "from" }
    },
    {
      title: "To",
      dataIndex: "to",
      sorter: true,
      scopedSlots: { customRender: "to" }
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
        click: () => this.navigateToEventTime(record.id)
      }
    };
  }

  navigateToEventTime(id: string) {
    this.$router.push({
      name: "schedules-id-timelines-sub_id",
      params: { id: this.$route.params.id, sub_id: id }
    });
  }

  onNavigateCreate() {
    this.$router.push({
      name: "schedules-id-timelines-create",
      params: this.$route.params
    });
  }
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  mounted() {
    this.fetchEventTimes({
      eventDateId: this.$route.params.id,
      pagination: this.pagination
    });
  }
  handleTableChange(pagination, filters, sorter) {
    this.fetchEventTimes({
      eventDateId: this.$route.params.id,
      pagination,
      filters,
      sorter
    });
  }
}
</script>

<style scoped>
</style>