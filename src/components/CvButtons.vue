<template>
  <div>
    <v-btn v-if="!hide_edit && !show_create" @click.stop="edit" small class="primary--text mx-3">
      <v-icon  small>mdi-pencil</v-icon>
    </v-btn>
    <v-btn v-if="!hide_remove && !show_create" @click.stop="remove" small class="red--text">
      <v-icon small>mdi-trash-can</v-icon>
    </v-btn>
    <v-btn small  v-if="show_create" @click.stop="create"  class="primary--text white">
      <v-icon class="font-weight-bold" >mdi-plus-box</v-icon>
    </v-btn>
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

export default {
  name: "cv-buttons",
  props: {
    hide_edit: {
      type: Boolean,
      require: false,
      default: false
    },
    hide_remove: {
      type: Boolean,
      require: false,
      default: false
    },
    show_create:{
      type:Boolean,
      require:false,
      default:false
    }
  },

  data() {
    return {}
  },
  methods: {
    edit() {
      this.$emit('edit');
    },
    remove() {
      this.$emit('remove');
    },
    create(){
      this.$emit('create');
    }
  },
};
</script>
