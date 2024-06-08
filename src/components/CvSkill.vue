<template>
  <div class="d-flex">
    <v-rating
        background-color="white"
        color="white"
        full-icon="mdi-star-box"
        length="6"
        readonly
        :value="computedSkill.value"
    ></v-rating>
    <v-chip small class="ml-2 white primary--text align-self-center mr-auto" label>
      <b> {{ computedSkill.name }} </b>
    </v-chip>
    <cv-buttons class="my-auto" @edit="editSkill(computedSkill.id)"/>
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
import CvButtons from "@/components/CvButtons.vue";

export default {
  name: "cv-skill",
  components: {CvButtons},
  props: {
    skill: {
      type: Object,
      require: true
    },
  },

  data() {
    return {}
  },
  methods: {
    ...mapMutations({
      editSkill:'cv/editSkill'
    }),
    removeSkill: function (){
      console.log('CvSkill - removeSkill')
    }
  },
  computed: {
    computedSkill() {
      return this.$props.skill;
    }
  },
};
</script>
