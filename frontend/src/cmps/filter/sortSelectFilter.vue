<template>
  <el-select v-model="value" @change="$emit('set-sorting-type', value)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "name",
          label: "Name",
        },
        {
          value: "price",
          label: "Price",
        },
      ],
      value: "name",
    };
  },
};
</script>