<template>
  <div id="app" class="main-layout-flex">
    <mainHeader />
    <section class="body">
      <router-view class="page-content" />
    </section>
  </div>
</template>

<script>
import mainHeader from "./cmps/mainHeader.vue";
export default {
  created() {
    this.$store.dispatch({ type: "loadToys" });
    this.$store.dispatch({ type: "loadToyTypes" });
  },
  components: { mainHeader },
};
</script>
