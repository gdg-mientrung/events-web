<template>
  <a-table
    :columns="columns"
    :rowKey="mentor => mentor.id"
    :dataSource="mentors"
    :pagination="pagination"
    :loading="isLoading"
    @change="handleTableChange"
    :customRow="customRow"
  >
    <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
  </a-table>
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

@Component({})
export default class extends Vue {
  @mentorsStore.Action fetchMentors;
  @mentorsStore.Getter isLoading;
  @mentorsStore.Getter mentors;

  pagination = {
    pageSize: 2,
    showSizeChanger: true,
    pageSizeOptions: ["2", "15", "20", "50", "100"],
    showTotal: total => `Total ${total} items`
  };
  columns: any[] = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
      width: "20%"
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "20%"
    },
    {
      title: "Title",
      sorter: true,
      dataIndex: "title"
    }
  ];
  customRow(record) {
    return {
      on: {
        click: () => {
          this.$router.push({
            name: "mentors-id",
            params: { id: record.id }
          });
        }
      }
    };
  }
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  mounted() {
    this.fetchMentors({ pagination: this.pagination });
  }
  handleTableChange(pagination, filters, sorter) {
    this.fetchMentors({ pagination, filters, sorter });
  }
}
</script>