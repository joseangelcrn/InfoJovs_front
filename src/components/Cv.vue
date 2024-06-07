<template>
  <div>
    <main-card class="mt-6" >
      <template #title>CV</template>
      <template #content>

        <cv-summary :summary="computedSummary" :editable="computedEditable"/>

        <div class="experiences mb-6 white--text">
          <h3 class="mt-2">Experience</h3>
          <div class="mt-3" v-for="(experience) in computedExperiences">
            <cv-experience :experience="experience" :editable="computedEditable"/>
          </div>
        </div>

        <div class="skills mt-3">
          <h3 class="white--text">Skills</h3>
          <div class="d-flex flex-column">
            <div v-for="(skill) in computedSkills">
              <cv-skill :skill="skill" :editable="computedEditable"/>
            </div>
          </div>
        </div>
      </template>
    </main-card>
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
import candidature from '@/store/candidature';
import CvExperience from "@/components/CvExperience.vue";
import CvSkill from "@/components/CvSkill.vue";
import CvButtons from "@/components/CvButtons.vue";
import CvSummary from "@/components/CvSummary.vue";
export default {
  name: "cv",
  components: {CvSummary, CvButtons, CvSkill, CvExperience},
  props: {
    summary:{
      type:String,
      require:true
    },
    experiences:{
      type:Array,
      require:true
    },
    skills:{
      type:Array,
      require:true
    },
    editable:{
      type:Boolean,
      require:false,
      default:false
    },
  },

  data() {
    return {

    }
  },
  methods: {},
  computed: {
    computedSummary(){
      return this.$props.summary ?? null;
    },
    computedExperiences(){
      return this.$props.experiences ?? [];
    },
    computedSkills(){
      return this.$props.skills ?? [];
    },
    computedEditable(){
      return this.$props.editable;
    }
  },
};
</script>
