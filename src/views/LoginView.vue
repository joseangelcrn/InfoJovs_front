<template>
  <v-container>
    <v-row d-flex justify="center">
      <v-col  md="8" lg="6"  cols="12"   >
        <Login  />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from '@/components/Login.vue';

// @ is an alias to /src

export default {
  name: "LoginView",
  components: {
    Login
  },
};
</script>
