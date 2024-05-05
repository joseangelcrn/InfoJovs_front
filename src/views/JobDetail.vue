<template>
  <div>
    <v-container>
      <v-row d-flex justify="center">
        <v-col cols="10">
          <main-card v-if="job">
            <template #title>Job Detail</template>
            <template #content>
              <v-row>
                <v-col>
                  <h3>{{ job.title }}</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    :value="job.description"
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
            </template>
            <template #actions>
              <v-btn
              v-if="user.roles.includes('employee')"
                v-on:click="register"
                small
                class="primary--text"
                :disabled="alreadyRegistered"
                :loading="loading"
                >{{
                  alreadyRegistered ? "Registered" : "Register"
                }}</v-btn
              >
            </template>
          </main-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      job: null,
      alreadyRegistered: false,
      loading: false,
    };
  },
  methods: {
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
    }),
    register: async function () {
      try {
        this.loading = true;
        let response = await this.$proxy.createCandidature({
          job_id: this.job.id,
        });
        console.log("response", response);
        this.alreadyRegistered = true;
        this.loading = false;

        this.manageModal({
          title: "Info",
          text: response.data.message,
          onClickYes: () => {
            this.hideModal();
          }
        });
      } catch (error) {
        console.log("error", error);
        this.manageModal({
          title: "Error",
          type:'error',
          text: "Oops!.. Something was wrong",
          onClickYes: () => {
            this.hideModal();
          }
        });
      }
    },
  },
  computed: {
    ...mapState(['user']),
    textAreaHeight() {
      let length = this.job.description.length;
      if (length <= 300) {
        return 250;
      } else if (length > 300 && length <= 600) {
        return 400;
      }

      return 600;
    },
  },
  mounted: async function () {
    console.log("id = " + this.$route.params.id);
    try {
      let response = await this.$proxy.getJobById(this.$route.params.id);
      console.log("response", response.data.job);
      this.job = response.data.job;
      this.alreadyRegistered = response.data.alreadyRegistered;
    } catch (error) {
      console.log("error", error);
    }
  },
};
</script>

<style></style>
