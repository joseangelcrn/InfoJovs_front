<template>
  <v-container>
    <v-row d-flex justify="center">
      <v-col  md="8" lg="6"  cols="12"   >
        <Register  />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from '../components/Register.vue';

// @ is an alias to /src

export default {
  name: "SignUpView",
  components: {
    Register
  },
};
</script>
