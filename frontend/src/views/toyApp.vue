<template>
  <div class="toy-app">
    <!-- <pre>{{ this.toys.length }}</pre> -->
    <toyFilter></toyFilter>
    <toyList :toys="this.toys" @delete-toy="deleteToy" />
    <el-pagination
      layout="prev, pager, next"
      :page-count="this.$store.getters.maxPage + 1"
      @current-change="setPage"
    />
    <hr />
    <toyEdit v-if="isAdmin"></toyEdit>
  </div>
</template>

<script>
import toyFilter from "../cmps/filter/toyFilter.vue";
import toyList from "../cmps/toyList.vue";
import toyEdit from "../views/toyEdit.vue";

export default {
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    deleteToy(id) {
      this.$store.dispatch({ type: "removeToy", id });
    },
    setPage(val) {
      const filter = JSON.parse(JSON.stringify(this.$store.getters.toyFilter));
      console.log("🚀 ~ file: toyApp.vue ~ line 33 ~ setPage ~ filter", filter);
      filter.page.idx = val - 1;
      this.$store.dispatch({ type: "setFilter", filter });
    },
  },
  components: { toyList, toyEdit, toyFilter },
};
</script>
