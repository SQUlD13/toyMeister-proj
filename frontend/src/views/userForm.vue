<template>
  <section class="user-form flex column center">
    <login />
    <template v-if="!loggedIn">
      <signup />
    </template>
  </section>
</template>


<script>
import login from "@/cmps/login.vue";
import signup from "@/cmps/signup.vue";
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  components: { login, signup },
};
</script>
