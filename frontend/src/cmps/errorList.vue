<template>
  <ul class="error-list" v-if="errorList.length">
    <h2>Please fix the following issues before submitting:</h2>
    <li v-for="(error, idx) in errorList" :key="idx" class="validation-error">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["errors"],
  data() {
    return {};
  },
  computed: {
    errorList() {
      return Object.values(this.errors).flat();
    },
  },
};
</script>