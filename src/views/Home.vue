<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="#FF6633" height="200">
            <div class="card">
              <h3>新規患者に関する報告件数の推移</h3>
              <p>card content card content card content card content card content card content card content card content </p>
              <v-btn class="btn">CLICK</v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="#FF6633">
            <div class="card">
              <vue-chart :chartData="chartData" :chartOption="chartOption"/>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueChart from '@/components/VueChart.vue';
import { Chart } from 'chart.js';
import Data from '@/data/data.json';
import formatGraph from '@/utils/formatGraph';

@Component({components: {VueChart}})
export default class Home extends Vue {
  chartData: Chart.ChartData = {};
  // chartData: Chart.ChartData = {
  //   labels: ['A', 'B', 'C', 'D', 'E'],
  //   datasets: [
  //     {
  //       label: 'data one',
  //       data: [1, 5, 3, 4, 3],
  //     },
  //     {
  //       label: 'data two',
  //       data: [10, 50, 30, 40, 30],
  //     },
  //   ],
  // };

  created() {
    const patientsGraph = formatGraph(Data.patients_summary.data);
    this.chartData = {
      labels: patientsGraph.map(d => {
        return d.label;
      }),
      datasets: [
        {
          label: 'transition',
          data: patientsGraph.map(d => {
            return d.transition;
          }),
        },
      ],
    };
  }

  chartOption: Chart.ChartOptions = {
    maintainAspectRatio: false,
  };
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;

  .btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
