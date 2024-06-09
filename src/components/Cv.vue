<template>
  <div>
    <main-card class="mt-6" customClassTitle="d-flex justify-space-between">
      <template #title>
          <div class="white--text">
            CV
          </div>
          <div v-if="!toggleCv">
            <v-chip small class="ml-2 white primary--text align-self-center font-weight-bold mr-auto" label>
              <tooltip text="Your total experience" :primary="false">
                <b>{{totalExp}}</b>
              </tooltip>
            </v-chip>
          </div>
          <div>
            <v-btn
                color="white primary--text"
                elevation="2"
                outlined
                @click="toggleCvShow"
                small
            >
              <v-icon class="ml-2" v-if="toggleCv">mdi-toggle-switch</v-icon>
              <v-icon class="ml-2" v-else>mdi-toggle-switch-off</v-icon>
            </v-btn>
          </div>
      </template>
      <template #content>
        <div v-show="toggleCv">

          <cv-summary :summary="computedSummary" :editable="computedEditable"/>

          <div class="experiences my-6 white--text">

            <div class="d-flex white--text  blue darken-4 rounded pa-1">
              <h3 class="my-auto mr-auto align-center">Experience</h3>
              <cv-buttons show_create />
            </div>

            <div class="mt-3" v-for="(experience) in computedExperiences">
              <cv-experience :experience="experience" :editable="computedEditable"/>
            </div>
          </div>

          <div class="skills mt-3">
            <div class="d-flex white--text  blue darken-4 rounded pa-1">
              <h3 class="my-auto mr-auto align-center">Skills</h3>
              <cv-buttons show_create />
            </div>
            <div class="d-flex flex-column mt-3">
              <div v-for="(skill) in computedSkills">
                <cv-skill :skill="skill" :editable="computedEditable"/>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main-card>
    <!--CRUD MODAL-->
    <modal-extended @clickOutside="onClickOutsideCvModal" :persistent="computedPersistent" :show="cv.modal.show"
                    width="900">
      <template #title>
        <span v-if="cv.modal.type" class="my-3">{{ $common.ucfirst(cv.modal.type) }}</span>
      </template>
      <template #content>
        <div v-if="cv.modal.type === 'summary'">
          <v-textarea
              v-model="cv.modal.data"
              solo
              outlined
              background-color="white"
              no-resize
          >
          </v-textarea>
        </div>
        <div v-else-if="cv.modal.type === 'experience'">
          <div class="d-flex">
            <v-text-field
                solo
                v-model="cv.modal.data.business"
                label="Business"
                outlined
                dense
                hint="Business"
            ></v-text-field>
            <!--START DATE-->
            <v-menu
                ref="menu_date_start"
                v-model="cv.modal.menus.start_date"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"

            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    solo
                    outlined
                    dense
                    class="mx-2"
                    hint="Start date"
                    v-model="cv.modal.data.start_date"
                    label="Start Date"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    readonly
                    color="white"
                    @click="onClickInputDate('start')"

                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="cv.modal.aux.start_date"
                  no-title
                  scrollable
                  color="primary"
                  persistent

              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="red"
                    @click="cv.modal.menus.start_date = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="onClickSaveDate('start')"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <!--FINISH DATE-->
            <v-menu
                ref="menu_date_finish"
                v-model="cv.modal.menus.finish_date"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"

            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    solo
                    outlined
                    dense
                    class="mx-2"
                    hint="Finish date"
                    v-model="cv.modal.data.finish_date"
                    label="Finish Date"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    readonly
                    color="white"
                    @click="onClickInputDate('end')"
                    clearable

                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="cv.modal.aux.finish_date"
                  no-title
                  scrollable
                  color="primary"
                  persistent

              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="red"
                    @click="cv.modal.menus.finish_date = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="onClickSaveDate('end')"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="d-flex mt-2">
            <v-textarea
                v-model="cv.modal.data.description"
                solo
                outlined
                no-resize
                hint="Job Description"
            >
            </v-textarea>
          </div>
        </div>
        <div v-else-if="cv.modal.type === 'skill'">
          <v-text-field
              solo
              v-model="cv.modal.data.name"
              label="Skill"
              outlined
              dense
              hint="Skill"
          ></v-text-field>
          <v-rating
              background-color="white"
              color="white"
              full-icon="mdi-star-box"
              length="6"
              v-model="cv.modal.data.value"
          ></v-rating>
        </div>
      </template>
      <template #actions>
        <v-btn small class="white primary--text mr-auto" @click="save">Save</v-btn>
        <v-btn small class="white red--text" @click="hideModal">Cancel</v-btn>
      </template>
    </modal-extended>
  </div>

</template>
<script>
import {mapActions, mapMutations, mapState} from "vuex";
import MainCard from "./MainCard.vue";
import {Bar} from "vue-chartjs";
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
import candidature from '@/store/candidature';
import CvExperience from "@/components/CvExperience.vue";
import CvSkill from "@/components/CvSkill.vue";
import CvButtons from "@/components/CvButtons.vue";
import CvSummary from "@/components/CvSummary.vue";

export default {
  name: "cv",
  components: {CvSummary, CvButtons, CvSkill, CvExperience},
  props: {
    summary: {
      type: String,
      require: true
    },
    experiences: {
      type: Array,
      require: true
    },
    skills: {
      type: Array,
      require: true
    },
    editable: {
      type: Boolean,
      require: false,
      default: false
    },
  },

  data() {
    return {
      toggleCv: true,
      totalExp: null
    }
  },
  methods: {
    ...mapMutations({
      hideModal: 'cv/hideModal',
      updateStartDate: 'cv/updateStartDate',
      updateFinishDate: 'cv/updateFinishDate',
      setAuxVar: 'cv/setAuxVar'
    }),
    ...mapActions({
      save: 'cv/save'
    }),
    onClickSaveDate: function (type) {
      if (type === 'start') {
        this.$refs.menu_date_start.save(this.cv.modal.aux.start_date);
        this.updateStartDate(this.cv.modal.aux.start_date);
      } else if (type === 'end') {
        this.$refs.menu_date_finish.save(this.cv.modal.aux.finish_date);
        this.updateFinishDate(this.cv.modal.aux.finish_date);
      }
    },

    onClickInputDate: function (type) {
      if (type === 'start') {
        this.setAuxVar({key: 'start_date', value: this.cv.modal.data.start_date})

      } else if (type === 'end') {
        this.setAuxVar({key: 'finish_date', value: this.cv.modal.data.finish_date})

      }
    },

    onClickOutsideCvModal: function (e) {
      if (!this.computedPersistent) {
        this.hideModal()
      }
    },

    getTotalExp: function(){
        let data = {y:0,m:0,d:0};

        this.cv.data.experiences.forEach((exp)=>{

          let {y,m,d} = this.$common.calculateDiffDates(exp.start_date,exp.finish_date);

          data.y += y;
          data.m += m;
          data.d += d;

        });

        this.totalExp =  this.$common.dateAsHuman(data.y,data.m,data.d);
    },
    toggleCvShow: function(){
      this.toggleCv = !this.toggleCv;

      if (!this.toggleCv){
        this.getTotalExp();
      }

    }
  },
  computed: {
    ...mapState({
      cv: 'cv'
    }),

    computedSummary() {
      return this.$props.summary ?? null;
    },
    computedExperiences() {
      return this.$props.experiences ?? [];
    },
    computedSkills() {
      return this.$props.skills ?? [];
    },
    computedEditable() {
      return this.$props.editable;
    },
    computedPersistent() {
      if (this.cv.modal.type === 'experience') {
        let {start_date = null, finish_date = null} = this.cv.modal.menus;

        let someMenuIsOpened = (start_date || finish_date);

        return (this.cv.modal.type === 'experience' && someMenuIsOpened);
      }
      return false;

    }
  },
};
</script>
