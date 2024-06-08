<template>
  <div>
    <div class="d-flex white--text">
      <h3 class="mt-2 mr-auto">Summary</h3>
      <cv-buttons hide_remove @edit="editSummary"/>
    </div>
    <div class="d-flex mt-2 pa-2 rounded white primary--text">
      <p class="font-weight-bold">{{computedSummary}}</p>
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
  name: "cv-summary",
  components: {CvButtons},
  props: {
    summary:{
      type:String,
      require:true
    },
  },

  data() {
    return {

    }
  },
  methods: {
    ...mapMutations({
      editSummary:'cv/editSummary'
    }),

  },
  computed: {
    computedSummary(){
      return this.$props.summary;
    }
  },
};
</script>
