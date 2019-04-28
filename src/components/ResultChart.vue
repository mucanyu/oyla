
<script>
import VueCharts from 'vue-chartjs'
import { Pie } from 'vue-chartjs'

export default {
	name: 'result-chart',
  extends: Pie,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    data: [10, 20, 30]
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>

</style>


