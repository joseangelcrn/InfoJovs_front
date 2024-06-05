<template>
  <v-container>
    <v-row>
      <v-col>
        <main-card>
          <template #content>
            <div class="d-flex">
              <img src="@/assets/images/user_icon.png"
                   style="background-color: white;border-radius: 30px; width: 100px; height: 100px;" alt="User Image">
              <div class="ml-2">
                <h1 class="white--text">{{ user.data.name }}</h1>
                <h2 class="mt-2 white primary--text pa-1 rounded"> {{ user.data?.professional_profile.title }}</h2>
                <div class="d-flex justify-space-between mt-2 white primary--text pa-1 rounded">
                  <v-icon color="primary">mdi-cake-variant-outline</v-icon>
                  <span class="text-h7 font-weight-bold"> {{ user.data?.birth_date }}</span>
                </div>
              </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex">
              <div class="d-flex justify-space-between mt-2 white primary--text pa-1 rounded">
                <v-icon color="orange">mdi-key-variant</v-icon>
                <span class="text-h7 font-weight-bold orange--text">    {{
                    user.roles
                        .map((role) => $common.capitalizeFirstLetter(role))
                        .join(",")
                  }}</span>
              </div>
            </div>
          </template>
        </main-card>
        <div class="my-6"></div>

        <main-card class="mt-6" v-if="$common.hasRole('Employee')">
          <template #content>
            <div class="d-flex justify-space-between">
              <v-btn
                  class="white primary--text"
                  elevation="2"
                  max-width="150"
                  :disabled="candidature.data.length === 0"
                  :to="{ name: 'myCandidatures' }"
              >
                My Candidatures
              </v-btn
              >
              <v-chip class="white primary--text  align-self-center"
              >You have <v-chip small class="primary white--text font-weight-bold mx-2">{{ candidature.data.length }}</v-chip> Job Application<span v-if="candidature.data.length > 1">s</span> </v-chip>
            </div>
          </template>
        </main-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      myCandidatures: "candidature/myCandidatures",
    }),
  },
  computed: {
    ...mapState({
      user: "user",
      job: "job",
      candidature: "candidature"
    }),
  },
  mounted: async function () {
    if (this.$common.hasRole("Employee")) {
      await this.myCandidatures();
    }
  },
};
</script>

<style></style>
