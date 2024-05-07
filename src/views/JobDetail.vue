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
                    :height="textAreaHeight"
                    no-resize
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <job-additional-info v-if="displayAdditionalInfo"></job-additional-info>
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
import JobAdditionalInfo from '@/components/JobAdditionalInfo.vue';
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: { JobAdditionalInfo },
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
    }
  },
  computed: {
    ...mapState(["user", "job"]),
    textAreaHeight() {
      console.log('computed text area height');
      if (!this.job.data || this.job.data.length === 0) {
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
    displayAdditionalInfo() {
      return (
        this.user.roles.includes("recruiter") &&
        this.user.data.id === this.job.data.recruiter_id
      );
    },
  },
  mounted: async function () {
    try {
      await this.getJobById(this.$route.params.id);
    } catch (error) {

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
};
</script>

<style></style>
