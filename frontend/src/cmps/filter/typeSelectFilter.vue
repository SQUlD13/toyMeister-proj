<template>
  <el-select
    v-model="filter"
    multiple
    placeholder="Category"
    @change="$emit('set-filter-type', filter)"
  >
    <el-option
      v-for="item in computedOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>


<script>
export default {
  props: ["types"],
  data() {
    return {
      filter: [],
    };
  },
  computed: {
    computedOptions() {
      return this.types.map((type) => {
        return {
          value: type.txt.toLowerCase(),
          label: type.txt,
        };
      });
      console.log(this.options);
    },
  },
};
</script>