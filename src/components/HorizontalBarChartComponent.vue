<script>
import { HorizontalBar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: 'HorizontalBarChartComponent',
  extends: HorizontalBar,
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
      default: '200',
    },
    width: {
      type: String,
      default: '300',
    },
  },
  mounted() {
    if (this.chartData !== null) this.renderChart(this.chartData, this.options);
  },
};
</script>
