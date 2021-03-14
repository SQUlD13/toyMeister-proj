<template>
  <div v-if="toy" class="toy-preview">
    <h1>{{ toy.name }}</h1>
    <div class="flex center">
      <h2>Price:</h2>
      <p class="light">{{ toy.price }}</p>
    </div>
    <p v-if="toy.type && toy.type.txt">Type : {{ toy.type.txt }}</p>
    <p v-if="toy.inStock">In Stock!</p>
    <el-row>
      <button @click="$router.push('/toy/' + toy._id)">Details</button>
      <button v-if="isAdmin" @click="$router.push('/toy/edit/' + toy._id)">
        Edit
      </button>
      <button v-if="isAdmin" @click="$emit('delete-toy', toy._id)">
        Delete
      </button>

      <!-- <button @click="$router.push('/toy/' + toy._id)">Details</button>
      <button @click="$router.push('/toy/edit/' + toy._id)">Edit</button>
      <button @click="$emit('delete-toy', toy._id)">Delete</button> -->
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["toy"],
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
};
</script>