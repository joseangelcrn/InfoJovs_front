<template>
  <div class="pa-10 elevation-5 rounded-xl mt-10" 
  style="background-color: white;"
  > 
  <!-- style="background-color:red;" -->

  <h1 class="primary--text my-3">Login</h1>
    <v-text-field
      :error="errors.username.length > 0"
      :error-messages="errors.username"
      error-count="1"
      v-model="username"
      label="Username"
      outlined
      @keypress.enter="login"
    ></v-text-field>
    <v-text-field
      :error="errors.password.length > 0"
      :error-messages="errors.password"
      error-count="1"
      v-model="password"
      label="Password"
      type="password"
      outlined
      @keypress.enter="login"
    ></v-text-field>
    <v-btn @click="login" class="primary--text" elevation="2" outlined
      >Login</v-btn
    >
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    errors: {
      username: [],
      password: [],
    },
  }),

  methods: {
    ...mapMutations("user", ["setUser"]),
    login: function () {
      this.errors.username = [];
      this.errors.password = [];
      if (this.username.trim().length === 0) {
        this.errors.username.push("Username is required");
      } else if (this.password.trim().length === 0) {
        this.errors.password.push("Password is required");
      } else {
        this.setUser({ username: this.username, password: this.password });
        console.log("doing login !");
        this.$router.push("/home");
      }
    },
  },
};
</script>
