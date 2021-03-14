<template>
  <el-row class="flex center" style="margin-block: 8px">
    <el-col :span="12">
      <div v-if="this.loggedIn" class="flex center column">
        <div class="block" @click="handleClick">
          <el-avatar :size="size" :src="url" />
        </div>
        <button @click="$store.dispatch({ type: 'logout' })">Log-Out</button>
      </div>
      <div v-else>
        <button @click="$router.push('/user')">Login Page</button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      size: 50,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
    url() {
      return this.loggedIn && this.user.url
        ? this.user.url
        : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    },
  },
  methods: {
    handleClick(ev) {
      this.$router.push(`/user/${this.user._id}`);
    },
  },
};
</script>
