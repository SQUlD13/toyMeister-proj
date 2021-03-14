<template>
  <section class="user-profile flex column center" v-if="user">
    <h1>{{ user.username }}'s Profile</h1>
    <userPreview :user="user" />
  </section>
</template>

<script>
import userPreview from "@/cmps/userPreview.vue";
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    this.user = await this.$store.dispatch({ type: "getUser", id: this.id });
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  components: {
    userPreview,
  },
};
</script>
