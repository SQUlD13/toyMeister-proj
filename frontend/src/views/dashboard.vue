<template>
  <section class="dashboard">
    <!-- <pre>{{ this.toyPriceMap }}</pre> -->
    <!-- <pre>{{ this.priceChartColors }}</pre> -->
    <div class="chart-wrapper">
      <h1>Prices per toy type:</h1>
      <doughnutChart
        v-if="toyPriceMap.length"
        :chartData="{
          labels: priceLabels,
          datasets: [{ ...priceChartData, ...priceChartColors }],
        }"
      >
      </doughnutChart>
    </div>

    <div class="chart-wrapper">
      <h1>Stock of inventory:</h1>
      <doughnutChart
        :chartData="{
          labels: ['In Stock', 'Out of stock'],
          datasets: [{ ...inventoryData, ...inventoryColors }],
        }"
      >
      </doughnutChart>
    </div>
  </section>
</template>

<script>
import toyService from "../services/toy.service.js";
import doughnutChart from "../cmps/doughnutChart.vue";
export default {
  data() {
    return {
      toyPriceMap: [],
      toyInventoryMap: [],
    };
  },
  async created() {
    const { toys } = await toyService.queryAll();
    this.getToyPriceMap(toys);
    this.getToyInventoryMap(toys);
  },
  computed: {
    priceData() {
      if (this.toyPriceMap) {
        return this.toyPriceMap.map((price) => {
          return price.price;
        });
      } else return [];
    },
    priceLabels() {
      return this.toyPriceMap.map((price) => {
        if (price.type && !price.type.txt) price.type.txt = "Undefined";
        return price.type.txt;
      });
    },
    priceChartColors() {
      const colorMap = this.toyPriceMap.map((price) => {
        return price.type.color;
      });
      return { backgroundColor: colorMap };
    },
    priceChartData() {
      return { data: this.priceData };
    },

    inventoryData() {
      return { data: Object.values(this.toyInventoryMap) };
    },
    inventoryColors() {
      return { backgroundColor: ["#51db7b", "#d6472b"] };
    },
  },
  methods: {
    getToyPriceMap(toys) {
      const map = toys.reduce((acc, toy) => {
        if (
          !acc.some((accToy) => {
            return accToy.type.txt === toy.type.txt;
          })
        ) {
          acc.push({
            type: toy.type,
            price: toy.price,
          });
        } else {
          var curr = acc.find((accType) => accType.type.txt === toy.type.txt);
          curr.price += toy.price;
        }
        return acc;
      }, []);
      this.toyPriceMap = map;
    },
    getToyInventoryMap(toys) {
      const map = toys.reduce((acc, toy) => {
        if (acc[toy.inStock]) {
          acc[toy.inStock]++;
        } else acc[toy.inStock] = 1;
        return acc;
      }, {});
      map.false = toys.length - map.true;
      this.toyInventoryMap = map;
    },
  },
  components: { doughnutChart },
};
</script>