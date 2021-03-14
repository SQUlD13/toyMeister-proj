<template>
  <form @change.prevent="$emit('set-stock-filter', savedData)">
    <el-radio v-model="savedData" label="1">All</el-radio>
    <el-radio v-model="savedData" label="2">In Stock</el-radio>
    <el-radio v-model="savedData" label="3">Out of Stock</el-radio>
  </form>
</template>

<script>
export default {
  data() {
    return {
      savedData: "1",
    };
  },
};
</script>