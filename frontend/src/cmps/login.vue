<template>
  <section class="login center column">
    <!-- <pre>
            user : {{this.user}}
            logged in? {{this.loggedIn}}
            </pre> -->
    <template v-if="!this.loggedIn">
      <h1>Log-in</h1>
      <form class="flex column" @submit="login">
        <el-input type="text" placeholder="User Name..." v-model="username" />
        <el-input type="text" placeholder="Password..." v-model="password" />
        <button type="submit" @click.prevent="login">Submit</button>
      </form>
    </template>
    <template v-else>
      <button @click="logout">LOG-OUT</button>
    </template>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async login() {
      console.log(this.username, "", this.password);
      const credentials = {
        username: this.username,
        password: this.password,
      };

      await this.$store.dispatch({ type: "login", credentials });
      this.$router.push("/toy");
    },
    async logout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
};
</script>