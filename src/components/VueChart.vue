<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { Chart } from 'chart.js';
import { Bar } from 'vue-chartjs';

@Component
export default class VueChart extends Mixins(Bar) {
  @Prop()
  chartData!: Chart.ChartData;
  @Prop()
  chartOption!: Chart.ChartOptions;

  mounted() {
    this.renderChart(this.chartData, this.chartOption);
  }
}
</script>
