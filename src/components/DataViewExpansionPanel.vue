<template>
  <div>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header :hide-actions="true">
          <div class="ExpansionPanel-Icon">
            <v-icon>mdi-chevron-right</v-icon>
            <span class="ExpansionPanel-Text">テーブルを表示</span>
          </div>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <slot />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DataViewExpansionPanel extends Vue {
  
}
</script>


<style lang="scss" scoped>
.ExpansionPanel-Icon {
  margin-left: -5px;

  .v-expansion-panel--active & .v-icon {
    transform: rotate(90deg) !important;
  }
}

.ExpansionPanel-Text {
  color: #333333;
  font-size: 14px;
}
</style>