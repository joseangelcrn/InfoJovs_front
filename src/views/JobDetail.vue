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
              <job-additional-info v-if="displayAdditionalInfo" :jobId="job.data.id" @openModal="openModal"></job-additional-info>
              <modal-extended style="z-index:10;position:absolute" @clickOutside="closeModal" :show="modals.changeStatus.show">
                <template #content>
                  <v-container>
                    <v-row>
                      <v-col>
                        <span class="my-3" v-html="modals.changeStatus.htmlText"/>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                        dense
                        solo
                        :items="candidatureStatus.data"
                        label="New Status"
                        outlined
                        v-model="modals.changeStatus.newStatusId"
                        item-text="name"
                        item-value="id"
                      >
                      <template v-slot:item="{item, on, attrs}">
                        <v-list-item v-on="on" :class="$common.getStatusColor(item.id)">
                          <v-list-item-action>
                            <v-simple-checkbox
                              :value="attrs.inputValue"
                              v-on="on"
                              color="black"
                              :ripple="false"
                            ></v-simple-checkbox>
                          </v-list-item-action>
                          <v-list-item-content >
                            <v-list-item-title>
                              {{ item.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
              </modal-extended>
            </template>
            <template #actions>
              <v-btn
                v-if="$common.hasRole('employee')"
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
      modals:{
        changeStatus:{
          show:false,
          htmlText:'',
          newStatusId:null
        }
      }
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
      getAllCandidatureStatuses:"candidatureStatus/getAll"
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
    openModal: async function(items){
      console.log('open modal - parent');
      console.log('data = ',items);
      await this.getAllCandidatureStatuses();
      // console.log('check this = ',this.candidatureStatus.data);
      let itemsLength = items.length ?? 1;
      this.modals.changeStatus.show = true;
      this.modals.changeStatus.htmlText = "<h3> Changing status of "+itemsLength+" candidature"+(itemsLength == 1 ? '': 's')+".</h3>"
      this.modals.changeStatus.items = items;
      this.modals.changeStatus.newStatusId = null;
    },
    closeModal: function(){
      console.log('close modal');
      this.modals.changeStatus.show = false;
    }
  },
  computed: {
    ...mapState(["user", "job","candidatureStatus"]),
    textAreaHeight() {
      console.log('computed text area height');
      if (
        !this.job.data ||
        this.job.data.length === 0 ||
        !this.job.data.description
      ) {
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
        this.$common.hasRole('recruiter') &&
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
