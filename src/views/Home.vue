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
          <v-card>
            <div class="card">
              <scrollable-chart :displayData="chartData">
                <template v-slot:chart>
                  <vue-chart :chartData="chartData" :chartOption="chartOption"/>
                </template>
              </scrollable-chart>
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
import ScrollableChart from '@/components/ScrollableChart.vue';

@Component({components: {VueChart, ScrollableChart}})
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
          backgroundColor: '#00a040',
          borderColor: '#5a8055',
          borderWidth: 1,
        },
      ],
    };
  }

  chartOption: Chart.ChartOptions = {
    tooltips: {
      displayColors: false,
      callbacks: {
        label: (tooltipItem, data) => {
          const labelText = parseInt(tooltipItem.value!).toLocaleString() + '人';
          return labelText;
        },
        title: (tooltipItem, data) => {
          const label = data.labels![tooltipItem[0].index!] as string;
          const dates = label.split('/');
          return dates[0] + '月' + dates[1] + '日';
        }
      }
    },
    maintainAspectRatio: false,
    legend: {
          display: false
    },
    scales: {
      xAxes: [
        {
          id: 'day',
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 9,
            fontColor: '#808080',
            maxTicksLimit: 20,
            maxRotation: 0,
            callback: (label: string) => {
              return label.split('/')[1]
            },
          },
        },
        {
          id: 'month',
          gridLines: {
            drawOnChartArea: false,
            drawTicks: true,
            drawBorder: false,
            tickMarkLength: 10,
          },
          ticks: {
            fontSize: 11,
            fontColor: '#808080',
            padding: 3,
            fontStyle: 'bold',
          },
          type: 'time',
          time: {
            unit: 'month',
            parser: 'M/D',
            displayFormats: {
              month: 'M月',
            },
          }
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: '#E5E5E5',
          }
        }
      ],
    }
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
