
<script>
import VueCharts from "vue-chartjs";
export default {
  extends: VueCharts.Doughnut,
  mixins: [VueCharts.mixins.reactiveProp],
  props: ["chartData"],
  mounted() {
    this.renderChart(this.chartData);
  },
};
</script>

<style>
</style>