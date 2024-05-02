<template>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
            <h1 class="mt-10">Page Not Found ! </h1>
            <v-icon class="mt-3" x-large>mdi-alert-circle</v-icon>
            <br>
            <v-btn class="primary mt-3" to="/home">{{ user.token ? 'Go home!' : 'Go Login!'}}</v-btn>

        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import { mapState } from 'vuex';
  
  // @ is an alias to /src
  
  export default {
    name: "NotFoundView",
    components: {
      
    },
    computed: {
      ...mapState({
        user:'user'
      })
    },
    created(){
      console.log('token = ',this.user);
    }
  };
  </script>
  