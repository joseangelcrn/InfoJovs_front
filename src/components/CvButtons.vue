<template>
  <div>
    <v-btn v-if="!hide_edit" @click.stop="edit" small class="primary--text mx-3">
      <v-icon  small>mdi-pencil</v-icon>
    </v-btn>
    <v-btn v-if="!hide_remove" @click.stop="remove" small class="red--text">
      <v-icon small>mdi-trash-can</v-icon>
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
    }
  },

  data() {
    return {}
  },
  methods: {
    edit() {
      console.log('cv - button => emit edit')
      this.$emit('edit');
    },
    remove() {
      console.log('cv - button => emit remove')
      this.$emit('remove');
    }
  },
};
</script>
