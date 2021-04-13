<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: 'LineChartComponent',
  extends: Line,
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
