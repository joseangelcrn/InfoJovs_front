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
              @click="seeMainAdditionalInfo"
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
                  <v-tabs fixed background-color="primary">
                    <v-tab @click="seeMainAdditionalInfo"> Main Info </v-tab>
                    <v-tab @click="seeCandidaturesInfo"> Candidatures </v-tab>
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
                        <template #content>
                          <v-row>
                            <v-col>
                              <v-data-table
                                v-model="candidature.selectedItems"
                                :headers="candidaturesTable.headers"
                                :items="candidature.data"
                                show-select
                                item-key="id"
                                class="elevation-1"
                                :loading="candidaturesTable.loading"
                                sort-by="created_at"
                                :sort-desc="true"
                              >
                              <template v-slot:item.status.name="{ item }">
                                <v-chip
                                  dark
                                  :color="$common.getStatusColor(item.status.id)"
                                  @click="onClickChipStatus(item)"
                                >
                                {{item.status.name}}
                                </v-chip>
                            </template>
                            </v-data-table>
                            </v-col>
                          </v-row>
                        </template>
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
import ModalExtended from './ModalExtended.vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: { MainCard, Bar, ModalExtended },
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
      candidaturesTable: {
        headers: [
          { text: 'Name', value: 'employee.name' },
          { text: 'Surnames', value: 'employee.first_surname' },
          { text: 'Professional Profile', value: 'employee.professional_profile.title' },
          { text: 'Status', value: 'status.name' },
          { text: 'Created at', value: 'created_at' },
          { text: 'Actions', value: 'actions', sortable:false },
        ],
        items: [
        ],
        selectedItems: [],
        loading:false
      },
    };
  },
  methods: {
    ...mapActions({
      getCandidaturesByJobId: "candidature/getByJobId",
      updateActiveValue: "job/updateActiveValue",
    }),
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
      setActiveOffer: "job/setActive",
    }),
    seeMainAdditionalInfo: async function () {
      const response = await this.$proxy.getJobAdditionalInfo(
        this.$props.jobId
      );
      var { status, profiles } = response.data;
      this.statusChartData = status;
      this.profileChartData = profiles;
      this.chartLoaded = true;
    },
    seeCandidaturesInfo: async function(){
      // this.candidaturesTable.items = [];
      this.candidaturesTable.loading = true;
      // const response = await this.$proxy.getJobAdditionalInfo(
      //   this.$props.jobId,
      //   'candidatures'
      // );
      // this.candidaturesTable.items = response.data;
      // console.log('see candidatures info !! = ',response.data.items);
      // this.candidaturesTable.items = response.data.items;
      await this.getCandidaturesByJobId(this.$props.jobId);
      this.candidaturesTable.loading = false;
      console.log('candidature data  = ',this.candidature.data);

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
    onClickChipStatus: function(item){
      if (this.candidaturesTable.selectedItems.length > 1) {
        console.log('Multiple Items');
        this.$emit('openModal',this.candidaturesTable.selectedItems);
      }
      else{
        console.log('Single Item');
        this.$emit('openModal',item);
      }
    }
  },
  computed: {
    ...mapState(["user", "job",'candidature']),
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
