<template>
  <div>
    <v-container>
      <v-row d-flex justify="center">
        <v-col cols="10">
          <main-card v-if="job.data">
            <template #title>Job Detail</template>
            <template #content>
              <v-row>
                <v-col>
                  <h3>{{ job.data.title }}</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    :value="job.data.description"
                    solo
                    outlined
                    background-color="white"
                    readonly
                    :height="100"
                    no-resize
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row v-if="displayExtraInfo" class="white--text">
                <v-col cols="12">
                  <h1>Additional Information</h1>
                  <br />
                  <h3><b>Candidatures: </b>1</h3>
                  <br />

                  <v-dialog
                    v-model="infoDialog"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="primary--text"
                        v-bind="attrs"
                        v-on="on"
                        @click="seeCandidatures"
                        >See Candidates</v-btn
                      >
                    </template>
                    <v-card>
                      <v-toolbar color="primary">
                        <v-btn icon dark @click="infoDialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title class="white--text">Candidates</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark text @click="dialog = false">
                            Save
                          </v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
                      <v-card-text class="mt-3">
                        <v-row>
                          <v-col>
                            <h1>Offer stats.. in progres...</h1>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </template>
            <template #actions>
              <v-btn
                v-if="user.roles.includes('employee')"
                v-on:click="register"
                small
                class="primary--text"
                :disabled="job.data.alreadyRegistered"
                :loading="loading"
                >{{ job.data.alreadyRegistered ? "Registered" : "Register" }}</v-btn
              >
            </template>
          </main-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      alreadyRegistered: false,
      loading: false,
      infoDialog: false,
    };
  },
  methods: {
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
      setAlReadyRegistered: "job/setAlreadyRegistered"
    }),
    ...mapActions({
      getJobById: "job/getJobById",
      infoCandidature: "job/infoCandidature",
    }),
    register: async function () {
      try {
        this.loading = true;
        let response = await this.$proxy.createCandidature({
          job_id: this.job.data.id,
        });
        this.setAlReadyRegistered(true);
        this.loading = false;

        this.manageModal({
          title: "Info",
          text: response.data.message,
          onClickYes: () => {
            this.hideModal();
          },
        });
      } catch (error) {
        this.loading = false;
        console.log("error", error);
        this.manageModal({
          title: "Error",
          type: "error",
          text: "Oops!.. Something was wrong",
          onClickYes: () => {
            this.hideModal();
          },
        });
      }
    },
    seeCandidatures: async function () {
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
    textAreaHeight() {
      if (!this.job) {
        return 200;
      }

      let length = this.job.data.description.length;
      if (length <= 300) {
        return 250;
      } else if (length > 300 && length <= 600) {
        return 400;
      }

      return 600;
    },
    displayExtraInfo() {
      return (
        this.user.roles.includes("recruiter") &&
        this.user.data.id === this.job.data.recruiter_id
      );
    },
  },
  mounted: async function () {
    console.log("id = " + this.$route.params.id);
    try {
      await this.getJobById(this.$route.params.id);
      console.log('job',this.job);
    } catch (error) {
      console.log("error", error);

      this.manageModal({
        title: "Error",
        type: "error",
        text: "Oops!.. Something was wrong",
        onClickYes: () => {
          this.hideModal();
        },
      });
    }
    console.log('already = '+this.job.data.alreadyRegistered);
  },
};
</script>

<style></style>
