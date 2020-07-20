<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="-1"
    :hide-default-footer="true"
    :height="240"
    :fixed-header="true"
    :disable-sort="true"
    :mobile-breakpoint="0"
  >
  </v-data-table>
</template>


<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator';

export type TableHeader = {
  text: string
  value: string
  align?: string
}

export type TableItem = {
  text: string
  transition: string
}

@Component
export default class DataViewTable extends Vue {
  @Prop()
  headers!: TableHeader[];
  @Prop()
  items!: TableItem[];
  @Prop()
  headerKey!: string; 
}
</script>

<style lang="scss">
table td {
	background: #eee;
}
table tbody tr:nth-child(odd) td {
	background-color: #fff !important;
}
</style>