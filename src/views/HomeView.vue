<template>
  <v-container>
    <v-row>
      <v-col>
        <main-card>
          <template #content>
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
                  Full-Stack Developer
                </v-list-item-title>
                <v-list-item-subtitle
                  >I develop frontend and backend applications
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <span class="white--text mb-4"
                  >You have <b class="black--text">{{jobApplications}}</b> Job Applications</span
                >
                <v-btn v-if="user.roles.includes('employee')" elevation="2" max-width="150" :to="{name:'myCandidatures'}"> My Candidatures</v-btn>
              </v-list-item-content>
            </v-list-item>
          </template>
        </main-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      jobApplications:9
    };
  },
  computed:{
    ...mapState({
      user:'user'
    })
  }
};
</script>

<style></style>
