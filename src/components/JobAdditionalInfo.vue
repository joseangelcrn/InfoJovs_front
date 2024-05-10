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
                    <v-tab> Main Info </v-tab>
                    <v-tab> Candidatures </v-tab>
                    <v-tab> Candidates </v-tab>
                    <v-tab-item>
                      <main-card class="mt-2">
                        <template #content>
                          <v-row class="white my-2 rounded">
                            <v-col cols="3" align-self="center">
                              <v-select
                                dense
                                solo
                                :items="jobStatus"
                                label="Offer status"
                                outlined
                                v-model="job.data.active"
                                @change="changeStatus"
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row
                            justify="center"
                            style="background-color: white"
                          >
                            <v-col cols="10">
                              <Bar
                                v-if="chartLoaded"
                                :data="statusChart"
                                :options="statusChart.options"
                                :style="{ minHeight: '300px' }"
                              />
                            </v-col>
                            <v-col cols="10">
                              <Bar
                                v-if="chartLoaded"
                                :data="profileChart"
                                :options="profileChart.options"
                                :style="{ minHeight: '300px' }"
                              />
                            </v-col>
                          </v-row>
                        </template>
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
import { mapActions, mapMutations, mapState } from "vuex";
import MainCard from "./MainCard.vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: { MainCard, Bar },
  name: "job-additional-info",
  props: {
    stats: {
      type: Object,
    },
    jobId: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      dialog: false,
      chartLoaded: false,
      statusChartData: {},
      profileChartData: {},
      jobStatus: [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 },
      ],
    };
  },
  methods: {
    ...mapActions({
      infoCandidature: "job/infoCandidature",
      updateActiveValue: "job/updateActiveValue",
    }),
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
      setActiveOffer:"job/setActive"
    }),
    seeAdditionalInfo: async function () {
      const response = await this.$proxy.getJobAdditionalInfo(
        this.$props.jobId
      );
      var { status, profiles } = response.data;
      this.statusChartData = status;
      this.profileChartData = profiles;
      this.chartLoaded = true;
    },

    changeStatus: async function () {
      try {
        let response = await this.updateActiveValue();
        console.log("response = " + response.data.message);
        this.manageModal({
          title: "Info",
          text: response.data.message,
          onClickYes: () => {
            this.hideModal();
          },
          onClickNot: () => {
            this.hideModal();
          },
        });
      } catch (error) {
        let newActiveValue = this.job.data.active;
        let rollBackValue = newActiveValue == 1 ? 0 : 1;
        this.setActiveOffer(rollBackValue);
        this.manageModal({
          title: "Error",
          type: "error",
          text: error.response.data.message,
          onClickYes: () => {
            this.hideModal();
          },
        });
      }
    },
  },
  computed: {
    ...mapState(["user", "job"]),
    statusChart() {
      return this.statusChartData;
    },
    profileChart() {
      return this.profileChartData;
    },
  },
  mounted() {
    console.log(this.job.data);
  },
  updated() {},
};
</script>
