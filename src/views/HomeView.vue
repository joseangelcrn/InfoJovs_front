<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto light-blue py-5">
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              size="100"
              color="grey"
              class="mr-10"
            ></v-list-item-avatar>

            <v-list-item-content class="white--text">
              <div class="text-overline mb-4 white--text">
                José Ángel Cabeza Rodiguez-Navas
              </div>
              <v-list-item-title class="text-h5 mb-1">
                Full-Stack Programmer
              </v-list-item-title>
              <v-list-item-subtitle
                >I develop frontend and backend applications
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <span class="white--text mb-4"
                >You have <b class="black--text">10</b> Job Applications</span
              >
              <v-btn elevation="2" max-width="150" to="/my_jobs"> See my jobs</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>