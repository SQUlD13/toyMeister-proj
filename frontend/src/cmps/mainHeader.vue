<template>
  <section class="main-header full">
    <nav class="main-nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="isAdmin" to="/dashboard">Dashboard</router-link>
      <router-link to="/toy">Toy Store</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <userPreview :user="user"></userPreview>
    <!-- <el-button
      @click="
        () => {
          this.$router.push('/user');
        }
      "
      >Login Page</el-button
    > -->
  </section>
</template>

<script>
import userPreview from "./userPreview.vue";
export default {
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  components: { userPreview },
};
</script>