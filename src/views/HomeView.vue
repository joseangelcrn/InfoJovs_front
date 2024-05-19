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
                  {{ user.data?.name }}
                </div>

                <v-list-item-title class="text-h5 mb-1">
                  {{ user.data?.professional_profile.title }}
                </v-list-item-title>
                <v-list-item-subtitle class="white--text">
                  <v-chip color="orange" label>
                    <b>Roles:&nbsp;&nbsp; </b>
                    {{
                      user.roles
                        .map((role) => $common.capitalizeFirstLetter(role))
                        .join(",")
                    }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-chip color="indigo white--text" label
                ><b>Birth Date: </b>{{ user.data?.birth_date }}</v-chip
              >
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item v-if="$common.hasRole('employee')">
              <v-list-item-content>
                <span class="white--text mb-4"
                  >You have
                  <b class="black--text">{{candidature.data.length}}</b>
                  Job Applications</span
                >
                <v-btn
                  elevation="2"
                  max-width="150"
                  :to="{ name: 'myCandidatures' }"
                >
                  My Candidatures</v-btn
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <template></template>
        </main-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      jobApplications: 9,
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
      candidature:"candidature"
    }),
  },
  mounted: async function () {
    console.log('mounted !');
    if (this.$common.hasRole("Employee")) {
      await this.myCandidatures();
    }
  },
};
</script>

<style></style>
