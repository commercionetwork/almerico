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
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
