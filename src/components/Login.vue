<template>
  <main-card
    customClassVcard="white pa-10 rounded-xl mt-10"
    customClassContent="pa-0"
  >
    <template #content>
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
      <div class="d-flex justify-space-between">
        <div>
          <v-btn @click="login" class="light-blue darken-4 primary--text " elevation="2" outlined
            >Login</v-btn
          >
        </div>
        <div>
          <v-btn
            class="primary--text"
            to="/signup"
            elevation="2"
            outlined
            >Sign in</v-btn
          >
        </div>
      </div>
    </template>
  </main-card>
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
