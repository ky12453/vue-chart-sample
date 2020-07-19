<template>
  <div ref="chartContainer" class="LegendStickyChart">
    <div ref="scrollable" class="scrollable">
      <div :style="{ width: `${chartWidth}px`}">
        <slot name="chart" />
      </div>
    </div>
    <slot name="sticky-chart" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator';
import { ChartData } from 'chart.js';
import { Bar } from 'vue-chartjs';

interface DataSets<T = number> extends ChartData {
  data: T[]
}

interface DisplayData<T = number, U = string> {
  labels?: U[]
  datasets: DataSets<T>[]
}

@Component
export default class ScrollableChart extends Vue {
  @Prop()
  displayData!: DisplayData;

  chartWidth: number = 300;
  timerId: number = 0

  labelCount() {
    return this.displayData.labels?.length || 0;
  }

  adjustChartWidth(): void {
    const container = this.$refs.chartContainer as HTMLElement;
    if (!container) return;
    const containerWidth = container.clientWidth;
    this.chartWidth = this.calcChartWidth(containerWidth, this.labelCount());
    this.scrollRightSide();
  }

  calcChartWidth(containerWidth: number, labelCount: number): number {
    const dates: number = 60;
    const yaxesWidth: number = 38;
    const chartWidth: number = containerWidth - yaxesWidth;
    const barWidth: number = chartWidth / dates;
    const calcWidth: number = barWidth * labelCount + yaxesWidth;
    return Math.max(calcWidth, containerWidth);
  }

  scrollRightSide(): void {
    const scrollable = this.$refs.scrollable as HTMLElement;
    if (!scrollable) return;
    setTimeout(() => {
      scrollable.scrollLeft = this.chartWidth;
    });
  }

  @Watch('chartWidth')
  handleResize(): void {
    clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.adjustChartWidth, 500);
  }

  mounted() {
    this.adjustChartWidth();
    window.addEventListener('resize', this.handleResize);
  }

  beforeDestory() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style lang="scss" scoped>
.LegendStickyChart {
  margin: 16px 0;
  position: relative;
  overflow: hidden;

  .scrollable {
    overflow-x: scroll;
  }

  .sticky-legend {
    position: absolute;
    top: 0;
    pointer-events: none;
    width: 100%;
  }
}
</style>
