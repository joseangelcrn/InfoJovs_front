<template>
  <div>
    <div class="d-flex">
      <v-chip small class="white primary--text align-self-center font-weight-bold" label>
        {{ computedExperience.business }}
      </v-chip>
      <v-chip small class="ml-2 white primary--text align-self-center font-weight-bold" label>
        {{ computedExperience.start_date }}
      </v-chip>
      <v-chip small class="ml-2 white primary--text align-self-center font-weight-bold mr-auto" label>
        {{ computedExperience.finish_date }}
      </v-chip>
      <cv-buttons @edit="editExperience" @remove="removeExperience"/>
    </div>
    <div class="d-flex mt-2 pa-2 rounded white primary--text">
      <p class="font-weight-bold">{{computedExperience.description}}</p>
    </div>
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
import CvButtons from "@/components/CvButtons.vue";
export default {
  name: "cv-experience",
  components: {CvButtons},
  props: {
    experience:{
      type:Object,
      require:true
    },
  },

  data() {
    return {

    }
  },
  methods: {
    editExperience: function (){
      console.log('CvExperience - editExperience')
    },
    removeExperience: function (){
      console.log('CvExperience - removeExperience')
    }
  },
  computed: {
    computedExperience(){
      return this.$props.experience;
    }
  },
};
</script>
