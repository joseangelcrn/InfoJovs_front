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
                          <v-row
                            class="d-flex justify-center"
                            style="background-color: white"
                          >
                            <v-col cols="10">
                              <Bar
                                v-if="chartLoaded"
                                :data="chartDataComputed"
                                :options="chartData.options"
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
import { mapActions, mapState } from "vuex";
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
      chartData: {
        labels: [""],
        datasets: [],
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              bodyColor: "white",
              backgroundColor: "#03A9F4",
            },
            title: {
              display: true,
              text: "Candidature Statuses",
              color: "#03A9F4",
              position: "top",
              align: "center",
              font: {
                weight: "bold",
                size: 30,
              },
            },
            legend: {
              position: "bottom",
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 26,
                },
              },
            },
          },
        },
      },
    };
  },
  methods: {
    ...mapActions({
      infoCandidature: "job/infoCandidature",
    }),
    seeAdditionalInfo: async function () {
      console.log("creating chart !");
      const response = await this.$proxy.getJobAdditionalInfo(
        this.$props.jobId
      );
      var { status, profiles } = response.data;
      var statusNames = this.$common.pluck(status, "name");
      var statusData = this.$common.pluck(status, "amount");

      status.forEach((item) => {
        this.chartData.datasets.push({
          label: [item.name],
          backgroundColor: [this.$common.getStatusColor(item.id, false)],
          data: [item.amount],
        });
      });

      this.chartLoaded = true;
      console.log(statusNames, statusData);
    },
  },
  computed: {
    ...mapState(["user", "job"]),

    chartDataComputed() {
      return this.chartData;
    },
  },
  mounted() {},
  updated() {},
};
</script>
