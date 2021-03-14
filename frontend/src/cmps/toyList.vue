<template>
  <ul class="toy-list clean-list">
    <li v-for="toy in toys" :key="toy._id">
      <toyPreview :toy="toy" @save-toy="saveToy" @delete-toy="deleteToy" />
    </li>
  </ul>
</template>

<script>
import toyPreview from "@/cmps/toyPreview.vue";
export default {
  props: ["toys"],
  methods: {
    saveToy(toy) {
      this.$emit("save-toy", toy);
    },
    deleteToy(id) {
      this.$emit("delete-toy", id);
    },
  },
  components: { toyPreview },
};
</script>