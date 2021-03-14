<template>
  <form class="toy-filter">
    <!-- <pre>{{ this.$store.getters.toyFilter }}</pre>
    <hr />
    <pre>{{ this.filter }}</pre> -->
    <!-- <pre>{{ this.$store.getters.maxPage }}</pre> -->
    <!-- <input type="search" v-model="filter.q" @input="searchDebounce" /> -->
    <el-input
      class="search-input"
      placeholder="Search input"
      v-model="filter.q"
      @input="searchDebounce"
      @clear="search"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        type="submit"
        @click.prevent="search"
      />
    </el-input>

    <button @click="isOpen = !isOpen" class="search-filter-btn">Filter</button>

    <transition name="slide-scale-down">
      <section v-if="isOpen" class="additional-filter">
        <stockRadioFilter
          v-model="filter.inStock"
          @set-stock-filter="setStockFilter"
          style="margin-block: 10px"
        />

        <h2>Sorting:</h2>
        <p>By:</p>
        <sortSelectFilter
          @set-sorting-type="setSortingType"
          style="margin-block: 10px"
        />

        <p>Order:</p>
        <el-switch
          style="display: block; margin-block: 10px"
          v-model="filter.isAsc"
          active-text="Ascending"
          inactive-text="Descending"
          @change="search"
        />

        <typeSelectFilter
          :types="this.toyTypes"
          @set-filter-type="setFilterType"
        />
      </section>
    </transition>
  </form>
</template>

<script>
import typeSelectFilter from "../filter/typeSelectFilter.vue";
import sortSelectFilter from "../filter/sortSelectFilter.vue";
import stockRadioFilter from "../filter/stockRadioFilter.vue";

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export default {
  data() {
    return {
      filter: {
        q: "",
        inStock: null,
        type: [],
        isAsc: true,
        sortBy: "name",
      },
      isOpen: false,
    };
  },
  created() {
    this.searchDebounce = debounce(this.search, 450);
  },
  computed: {
    toyTypes() {
      return this.$store.getters.toyTypes;
    },
  },
  methods: {
    search() {
      console.log("searching with filter", this.filter);
      this.$store
        .dispatch({ type: "setFilter", filter: this.filter })
        .then((ans) => {});
    },
    setFilterType(type) {
      this.filter.type = type;
      this.search();
    },
    setSortingType(val) {
      this.filter.sortBy = val;
      this.search();
    },
    setStockFilter(val) {
      if (val === "1") this.filter.inStock = null;
      else if (val === "2") this.filter.inStock = true;
      else this.filter.inStock = false;
      this.search();
    },
  },
  components: { typeSelectFilter, sortSelectFilter, stockRadioFilter },
};
</script>