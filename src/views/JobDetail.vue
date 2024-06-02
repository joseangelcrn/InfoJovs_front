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
              <job-additional-info v-if="displayAdditionalInfo" :jobId="job.data.id" @openModal="openStatusModal" @showEmployeeAnswers="showEmployeeAnswers"></job-additional-info>
              <modal-extended style="z-index:10;position:absolute" @clickOutside="closeStatusModal" :show="modals.changeStatus.show">
                <template #title>
                  <span class="my-3" v-html="modals.changeStatus.htmlText"/>
                </template>
                <template #content>
                  <v-container class="bg-white">
                    <v-row>
                      <v-col>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col style="padding: 0px;">
                        <v-select
                        dense
                        solo
                        :items="candidatureStatus.data"
                        label="New Status"
                        outlined
                        v-model="modals.changeStatus.newStatusId"
                        item-text="name"
                        item-value="id"
                        :color="$common.getStatusColor(modals.changeStatus.newStatusId)"
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
                <template #actions>
                  <v-btn
                  v-on:click="updateCandStatus"
                  small
                  class="primary--text"
                  :disabled="!modals.changeStatus.newStatusId"
                  :loading="loading"
                  >Update</v-btn
                >
                </template>
              </modal-extended>
              <v-row v-if="job.data.alreadyRegistered" >
                <v-col cols="12">
                  <v-btn
                    color="white primary--text"
                    elevation="2"
                    outlined
                    @click="show.history = !show.history"
                  >
                  <v-icon class="mr-2">mdi-timeline-text-outline</v-icon>
                  Candidature Timeline
                  <v-icon class="ml-2" v-if="show.history == true">mdi-toggle-switch</v-icon>
                  <v-icon class="ml-2" v-else>mdi-toggle-switch-off</v-icon>
                </v-btn>
                </v-col>
                <v-col v-show="show.history">
                  <job-history :history="candidatureHistory.data" />
                </v-col>
              </v-row>
              <modal-extended class="white" background-content="white" :show="modals.questions.show" @clickOutside="modals.questions.show = false">
                <template #title>Candidature questions</template>
                <template #content>
                  <v-container class="white">
                    <v-row>
                      <v-col cols="12" v-for="(question, index ) in question.data" :key="index">
                        <question-displayer  :question="question" :index="question" />
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
                <template #actions>
                  <div class="question_buttons" v-if="!question.readOnly">
                    <v-btn
                        small
                        class="primary--text"
                        @click="register(true)"
                    >Register</v-btn>
                  </div>
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
import JobHistory from '@/components/JobHistory.vue';
import candidatureHistory from '@/store/candidatureHistory';
import QuestionDisplayer from "@/components/QuestionDisplayer.vue";
export default {
  components: {QuestionDisplayer, JobAdditionalInfo, JobHistory },
  data() {
    return {
      alreadyRegistered: false,
      loading: false,
      infoDialog: false,
      modals:{
        changeStatus:{
          show:false,
          htmlText:'',
          newStatusId:null,
          items:[]
        },
        questions:{
          show:false
        }
      },
      show:{
        history:false
      }
    };
  },
  methods: {
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
      setAlReadyRegistered: "job/setAlreadyRegistered",
      deselectAllCandidatures:"candidature/deselectAll",
      addValueFieldToQuestions:"question/addValueField",
      setQuestionData:"question/setData",
      setGlobalReadOnlyQuestionModal:"question/setReadOnly"
    }),
    ...mapActions({
      getJobById: "job/getJobById",
      infoCandidature: "job/infoCandidature",
      getAllCandidatureStatuses:"candidatureStatus/getAll",
      updateCandidatures: 'candidature/update',
      getHistory:'candidatureHistory/getHistory'
    }),
    register: async function (force = false) {
      //prevent event as param force
      force = (typeof force === 'boolean' && force === true);

      if (!force && this.job.data.questions){
        //Create candidature with questions
        this.modals.questions.show =true;
        this.setGlobalReadOnlyQuestionModal(false);
      }
      else{
        //Create candidature without questions
        try {
          this.loading = true;
          let params = {
            job_id: this.job.data.id,
            questions:this.question.data
          };

          let response = await this.$proxy.createCandidature(params);
          let {candidature} = response.data;
          this.setAlReadyRegistered(true);
          this.loading = false;
          this.modals.questions.show = false;
          await this.getHistory(candidature.id);

          this.manageModal({
            title: "Info",
            text: response.data.message,
          });
        } catch (error) {
          this.loading = false;
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
    openStatusModal: async function(items){
      await this.getAllCandidatureStatuses();
      // console.log('check this = ',this.candidatureStatus.data);
      let itemsLength = items.length ?? 1;
      this.modals.changeStatus.show = true;
      this.modals.changeStatus.htmlText = "<h3> Changing status of "+this.candidature.selectedItems.length+" candidature"+(itemsLength == 1 ? '': 's')+".</h3>"
      this.modals.changeStatus.items = items;
      this.modals.changeStatus.newStatusId = null;
    },
    closeStatusModal: function(){
      this.modals.changeStatus.show = false;
    },
    updateCandStatus: async function () {
      let candIds = this.$common.pluck(this.candidature.selectedItems,'id');
      let newStatusId = this.modals.changeStatus.newStatusId;
      await this.updateCandidatures({
        candIds,
        newStatusId
      });
      this.modals.changeStatus.show = false;
      this.deselectAllCandidatures();
    },
    showEmployeeAnswers: function (questions){
      this.setQuestionData(questions);
      this.modals.questions.show = true;
      this.setGlobalReadOnlyQuestionModal(true);
    }
  },
  computed: {
    ...mapState(["user", "job","candidatureStatus",'candidature','candidatureHistory','question']),
    textAreaHeight() {
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
      await this.getHistory(this.$route.params.id);
      if (this.job.data.questions){
        this.setQuestionData(this.job.data.questions);
        this.addValueFieldToQuestions();
      }
    } catch (error) {

      this.manageModal({
        title: "Error",
        type: "error",
        text: "Oops!.. Something was wrong",
        onClickYes: () => {
          this.modals.questions.show = false;
          this.hideModal();
        },
      });
    }
  },
};
</script>

<style></style>
