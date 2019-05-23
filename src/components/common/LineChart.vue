<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  description: "Line chart",
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    height: {
      type: String,
      default: "60"
    },
    width: {
      type: String,
      default: "90"
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>