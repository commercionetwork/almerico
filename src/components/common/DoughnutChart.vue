<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "DoughnutChart",
  description: "Doughnut chart",
  extends: Doughnut,
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
      default: "100"
    },
    width: {
      type: String,
      default: "100"
    }
  },
  watch: {
    chartdata(data) {
      this.renderChart(data, this.options);
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
