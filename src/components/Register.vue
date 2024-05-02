<template>
  <main-card
    customClassVcard="white pa-10 rounded-xl mt-10"
    customClassContent="pa-0"
  >
    <template #content>
      <h1 class="primary--text my-3">Sign up</h1>
      <v-text-field
        :error="errors.name.length > 0"
        :error-messages="errors.name"
        error-count="1"
        v-model="name"
        label="Name"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        :error="errors.firstSurname.length > 0"
        :error-messages="errors.firstSurname"
        error-count="1"
        v-model="firstSurname"
        label="First surname"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        :error="errors.secondSurname.length > 0"
        :error-messages="errors.secondSurname"
        error-count="1"
        v-model="secondSurname"
        label="Second surname"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        :error="errors.email.length > 0"
        :error-messages="errors.email"
        error-count="1"
        v-model="email"
        label="Email"
        type="email"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        :error="errors.password.length > 0"
        :error-messages="errors.password"
        error-count="1"
        v-model="password"
        label="Password"
        type="password"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        :error="errors.repeatPassword.length > 0"
        :error-messages="errors.repeatPassword"
        error-count="1"
        v-model="repeatPassword"
        label="Repeat password"
        type="password"
        outlined
        @keypress.enter="register"
      ></v-text-field>

      <div class="d-flex justify-space-between">
        <div>
          <v-btn
            v-on:click="register"
            class="light-blue darken-4 primary--text"
            elevation="2"
            outlined
            >Sign Up</v-btn
          >
        </div>
        <div>
          <v-btn class="primary--text" to="/login" elevation="2" outlined
            >Login</v-btn
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
  data: () => ({
    name: "",
    firstSurname: "",
    secondSurname: "",
    email: "",
    password: "",
    repeatPassword: "",
    errors: {
      name: [],
      firstSurname: [],
      secondSurname: [],
      email: [],
      password: [],
      repeatPassword: [],
    },
  }),

  methods: {
    ...mapActions({
      signUp: "user/signup",
    }),
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
    }),
    register: async function () {
      console.log("register !");
      this.errors = {
        name: [],
        firstSurname: [],
        secondSurname: [],
        email: [],
        password: [],
        repeatPassword: [],
      };

      if (this.name.trim().length == 0) {
        this.errors.name.push("Name is required");
      } else if (this.firstSurname.trim().length == 0) {
        this.errors.firstSurname.push("First Surname is required");
      } else if (this.secondSurname.trim().length == 0) {
        this.errors.secondSurname.push("Second Surname is required");
      } else if (this.email.trim().length == 0) {
        this.errors.email.push("Email is required");
      } else if (!this.validateEmail()) {
        this.errors.email.push("Email is invalid");
      } else if (this.password.trim().length == 0) {
        this.errors.password.push("Password is required");
      } else if (this.password.length < 4) {
        this.errors.password.push("Minimum password length: 4");
      } else if (this.repeatPassword.trim().length == 0) {
        this.errors.repeatPassword.push("Repeat Password is required");
      } else if (this.password != this.repeatPassword) {
        this.errors.repeatPassword.push("Passwords are different");
      } else {
        //register in backend..
        try {
          let response = await this.$proxy.signUp({
            name: this.name,
            first_surname: this.firstSurname,
            second_surname: this.secondSurname,
            email: this.email,
            password: this.password,
          });
          console.log('sign up OK !! ');
          this.manageModal({
            title: "Congratulations !",
            text: "You have been registered successfully !",
            onClickYes: () => {
              console.log("Si modificado");
              router.push({name:'login'});
              this.hideModal();
            },
          });
        } catch (error) {
          var { email = [] } = error.response.data.message;
          this.errors.email = email;
          console.log("error");
          console.log(error.response.data.message);
        }
      }
    },
    validateEmail: function () {
      return (
        String(this.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) != null
      );
    },
  },
};
</script>
