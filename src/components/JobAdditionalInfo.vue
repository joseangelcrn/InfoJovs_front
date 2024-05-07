<template>
  <div>
    <v-row class="white--text">
      <v-col cols="2">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="primary--text"
              v-bind="attrs"
              v-on="on"
              @click="seeAdditionalInfo"
              >Additional Info</v-btn
            >
          </template>
          <v-card>
            <v-toolbar color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="white--text">Candidates</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <!-- <v-btn dark text @click="dialog = false"> Save </v-btn> -->
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text class="mt-3">
              <v-row>
                <v-col>
                  <!-- Additional Info Job Offer -->
                  <!-- Candidatures -->
                  <!-- Candidates -->
                  <v-tabs fixed background-color="primary">
                    <v-tab > Main Info </v-tab>
                    <v-tab > Candidatures </v-tab>
                    <v-tab > Candidates </v-tab>
                    <v-tab-item>
                      <main-card class="mt-2">
                        <template #title>Main Info</template>
                      </main-card>
                    </v-tab-item>
                    <v-tab-item>
                      <main-card class="mt-2">
                        <template #title>Candidatures</template>
                      </main-card>
                    </v-tab-item>
                    <v-tab-item>
                      <main-card class="mt-2">
                        <template #title>Candidates</template>
                      </main-card>
                    </v-tab-item>
                  </v-tabs>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MainCard from './MainCard.vue';
export default {
  components: { MainCard },
  name: "job-additional-info",
  props: {},

  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      infoCandidature: "job/infoCandidature",
    }),
    seeAdditionalInfo: async function () {
      console.log("see candidates ");
      try {
        await this.infoCandidature();
        console.log(this.job.candidatures);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  computed: {
    ...mapState(["user", "job"]),
  },
  mounted() {},
  updated() {},
};
</script>
