<script>
import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: 'BarChartComponent',
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    height: {
      type: String,
      default: '100',
    },
    width: {
      type: String,
      default: '150',
    },
  },
  mounted() {
    if (this.chartData !== null) this.renderChart(this.chartData, this.options);
  },
};
</script>
