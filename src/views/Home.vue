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
          <data-view title="新規患者に関する報告件数の推移">
            <template v-slot:description>
              <ul class="ListStyleNone">
                <li>（注）保健所から発生届が提出された日を基準とする</li>
                <li>（注）医療機関等が行った検査も含む</li>
                <li>（注）チャーター機帰国者、クルーズ船乗客等は含まれていない</li>
              </ul>
            </template>

            <scrollable-chart :displayData="chartData">
              <template v-slot:chart>
                <vue-chart :chartData="chartData" :chartOption="chartOption"/>
              </template>
            </scrollable-chart>

            <template v-slot:dataTable>
              <data-view-table :headers="tableHeaders()" :items="tableData()"/>
            </template>
          </data-view>
          <!-- <v-card>
            <div class="card">
              <scrollable-chart :displayData="chartData">
                <template v-slot:chart>
                  <vue-chart :chartData="chartData" :chartOption="chartOption"/>
                </template>
              </scrollable-chart>
            </div>
          </v-card> -->

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
import DataView from '@/components/DataView.vue';
import DataViewTable from '@/components/DataViewTable.vue';
import { TableHeader, TableItem } from '@/components/DataViewTable.vue';

@Component({components: {VueChart, ScrollableChart, DataView, DataViewTable}})
export default class Home extends Vue {
  chartData: Chart.ChartData = {};

  tableHeaders(): TableHeader[] {
    return [
      {
        text: '日付',
        value: 'text'
      },
      {
        text: '報告件数の推移（日別）',
        value: 'transition',
        align: 'end',
      },
    ];
  }

  tableData(): TableItem[] {
    const patientsGraph = formatGraph(Data.patients_summary.data);
    return patientsGraph.map(d => {
      return {
        text: d.label,
        transition: d.transition.toLocaleString(),
      }
    })
  }


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
