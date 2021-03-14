<template>
  <section class="signup center column">
    <!-- <pre>
            user : {{this.user}}
            logged in? {{this.loggedIn}}
            </pre> -->
    <template>
      <h1>Sign-up</h1>
      <form class="flex column" @submit="register">
        <el-input type="text" placeholder="User Name..." v-model="username" />
        <el-input type="text" placeholder="Password..." v-model="password" />
        <button type="submit" @click.prevent="register">Submit</button>
      </form>
    </template>
  </section>
</template>

<script>
import userService from "../services/user.service.js";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      console.log("Button going to frontend service", this.username);
      const credentials = { username: this.username, password: this.password };
      await this.$store.dispatch({ type: "signup", credentials });
      this.$router.push("/toy");
    },
  },
};
</script>
