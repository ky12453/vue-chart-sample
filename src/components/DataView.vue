<template>
  <v-card class="DataView">
    <div class="DataView-Inner">
      <!-- ヘッダ表示 -->
      <div class="DataView-Header">
        <h3 class="DataView-Title">
          {{ title }}
        </h3>
      </div>

      <!-- 注釈表示 -->
      <div class="DataView-Description">
        <slot name="description" />
      </div>

      <!-- グラフ表示 -->
      <div class="DataView-Content">
        <slot />
      </div>

      <!-- テーブル表示 -->
      <data-view-expansion-panel>
        <slot name="dataTable" />
      </data-view-expansion-panel>
    </div>
  </v-card>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DataViewExpansionPanel from '@/components/DataViewExpansionPanel.vue';

@Component({components: {DataViewExpansionPanel}})
export default class DataView extends Vue {
  @Prop()
  title!: String;
}
</script>


<style lang="scss">
.DataView {
  &-Inner {
    display: flex;
    flex-flow: column;
    padding: 22px;
    height: 100%;
  }

  &-Header {
    display: flex;
    align-items: flex-start;
    flex-flow: column;
    padding: 0 22px;
  }

  &-Title {
    width: 100%;
    margin-bottom: 10px;
    line-height: 1.5;
    font-weight: normal;
    font-size: 20px;
    color: #4d4d4d;
  }

  &-Description {
    font-size: 12px;
    color: #707070;
    margin-top: 10px;

    .ListStyleNone {
      list-style: none;
    }
  }

  &-Content {
    margin: 16px 0;
    padding: 0 22px;
  }
}
</style>