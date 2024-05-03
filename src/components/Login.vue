<template>
  <main-card
    customClassVcard="white pa-10 rounded-xl mt-10"
    customClassContent="pa-0"
  >
    <template #content>
      <h1 class="primary--text my-3">Login</h1>
      <v-text-field
        solo
        :error="errors.email.length > 0"
        :error-messages="errors.email"
        error-count="1"
        v-model="email"
        label="Email"
        outlined
        @keypress.enter="handleLogin"
      ></v-text-field>
      <v-text-field
        solo
        :error="errors.password.length > 0"
        :error-messages="errors.password"
        error-count="1"
        v-model="password"
        label="Password"
        type="password"
        outlined
        @keypress.enter="handleLogin"
      ></v-text-field>
      <div class="d-flex justify-space-between">
        <div>
          <v-btn 
          :loading="loading"
          @click="handleLogin" class="light-blue darken-4 primary--text " elevation="2" outlined
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
import router from '@/router';
import { mapActions, mapMutations } from "vuex";
export default {
  name: "Login",
  data: () => ({
    email: "recruiter@gmail.com",
    password: "recruiter",
    errors: {
      email: [],
      password: [],
    },
    loading:false
  }),

  methods: {
    ...mapMutations("user", ["setToken"]),
    ...mapActions("user",['login']),
    handleLogin:async function () {
      this.errors.email = [];
      this.errors.password = [];
      if (this.email.trim().length === 0) {
        this.errors.email.push("Email is required");
      } else if (this.password.trim().length === 0) {
        this.errors.password.push("Password is required");
      } else {
        console.log('passss = '+this.password);
        this.login({
          email:this.email,
          password:this.password
        })
        .then(()=>{router.push('/home')})
        .catch((error)=>{
          this.errors.email.push('Wrong credentials ! :(')
          this.errors.password.push('Wrong credentials ! :(')
        });
      }
    },
  },
};
</script>
