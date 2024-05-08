<template>
  <main-card
    customClassVcard="white pa-10 rounded-xl mt-10"
    customClassContent="pa-0"
  >
    <template #content>
      <h1 class="primary--text my-3">Sign up</h1>
      <v-text-field
        solo
        :error="errors.name.length > 0"
        :error-messages="errors.name"
        error-count="1"
        v-model="name"
        label="Name"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        solo
        :error="errors.firstSurname.length > 0"
        :error-messages="errors.firstSurname"
        error-count="1"
        v-model="firstSurname"
        label="First surname"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        solo
        :error="errors.secondSurname.length > 0"
        :error-messages="errors.secondSurname"
        error-count="1"
        v-model="secondSurname"
        label="Second surname"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-text-field
        solo
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
        solo
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
        solo
        :error="errors.repeatPassword.length > 0"
        :error-messages="errors.repeatPassword"
        error-count="1"
        v-model="repeatPassword"
        label="Repeat password"
        type="password"
        outlined
        @keypress.enter="register"
      ></v-text-field>
      <v-combobox
        v-model="roleSelect.model"
        solo
        label="Role"
        color="primary"
        item-text="name"
        outlined
        :items="roleSelect.items"
        :error="errors.role.length > 0"
        :error-messages="errors.role"
        @change="resetProfiles"
      >
      </v-combobox>

      <v-autocomplete
        v-model="profileInput.model"
        solo
        :items="profiles.data"
        :loading="profileInput.loading"
        :search-input.sync="profileInput.search"
        :disabled="!roleSelect.model"
        outlined
        color="primary"
        no-data-text="No Results"
        hide-selected
        item-text="title"
        item-value="id"
        label="Professional Profile"
        :error="errors.profile.length > 0"
        :error-messages="errors.profile"
      ></v-autocomplete>
      <!-- <v-menu
        ref="birthday"
        v-model="birthday.menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="birthday.data"
            label="Date"
            hint="MM/DD/YYYY format"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            @blur="birthday.data = parseDate(dateFormatted)"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="birthday.data"
          no-title
          @input="birthday.menu = false"
        ></v-date-picker>
      </v-menu> -->

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
import router from "@/router";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    name: "",
    firstSurname: "",
    secondSurname: "",
    email: "",
    password: "",
    repeatPassword: "",
    profileInput: {
      model: null,
      loading: false,
      search: null,
    },
    roleSelect: {
      model: null,
      items: [],
    },
    birthday: {
      menu:false,
      data:new Date()
    },
    errors: null,
  }),

  methods: {
    ...mapActions({
      signUp: "user/signup",
      searchProfiles: "professionalProfile/search",
    }),
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
    }),
    setupErrors: function () {
      this.errors = {
        name: [],
        firstSurname: [],
        secondSurname: [],
        email: [],
        password: [],
        repeatPassword: [],
        profile: [],
        role: [],
      };
    },
    register: async function () {
      this.setupErrors();

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
      } else if (!this.roleSelect.model) {
        this.errors.role.push("Role is required");
      } else if (!this.profileInput.model) {
        this.errors.profile.push("Profile is required");
      } else {
        //register in backend..
        try {
          let response = await this.$proxy.signUp({
            name: this.name,
            first_surname: this.firstSurname,
            second_surname: this.secondSurname,
            email: this.email,
            password: this.password,
            role_id: this.roleSelect.model.id,
            professional_profile_id: this.profileInput.model,
          });
          console.log("sign up OK !! ");
          this.manageModal({
            title: "Congratulations !",
            text: "You have been registered successfully !",
            onClickYes: () => {
              console.log("Si modificado");
              router.push({ name: "login" });
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
    resetProfiles: function () {
      this.profileInput.model = null;
      this.profileInput.items = null;
    },
    // formatDate: function(){
    //   if (!date) return null

    //   const [month, day, year] = date.split('/')
    //   return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    // }
  },
  computed: {
    ...mapState({
      profiles: "professionalProfile",
    }),
    profileInputSearch() {
      return this.profileInput.search;
    },
    // computedBirthdayFormatted () {
    //     return this.formatDate(this.date)
    //   },
  },
  watch: {
    profileInputSearch: async function (val) {
      console.log("watch - search ");
      console.log("value = " + val);

      // Items have already been requested
      if (this.profileInput.loading) return;

      console.log("call ajax !");
      this.profileInput.loading = true;
      await this.searchProfiles({ title: val, role_id: this.roleSelect.model });
      this.profileInput.loading = false;
    },
    // date (val) {
    //     this.birthday.data = this.formatDate(this.date)
    //   },
  },
  created: async function () {
    this.setupErrors();
    let response = await this.$proxy.getAllRoles();
    this.roleSelect.items = response.data;
  },
};
</script>
