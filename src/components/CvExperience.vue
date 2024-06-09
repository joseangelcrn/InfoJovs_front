<template>
  <div>
    <div class="d-flex">
      <v-chip small class="white primary--text align-self-center font-weight-bold" label>
        {{ computedExperience.business }}
      </v-chip>
      <v-chip small class="ml-2 white primary--text align-self-center font-weight-bold" label>
        {{ computedExperience.start_date }}
      </v-chip>
      <v-chip small class="ml-2 white primary--text align-self-center font-weight-bold" label>
        {{ computedExperience.finish_date  ?? 'Currently'}}
      </v-chip>
      <v-chip small class="ml-2 white primary--text align-self-center font-weight-bold mr-auto" label>
        {{ $common.calculateDiffDates(computedExperience.start_date,computedExperience.finish_date,true) }}
      </v-chip>
      <cv-buttons @edit="editExperience(computedExperience.id)" @remove="removeExperience"/>
    </div>
    <div class="d-flex mt-2 pa-2 rounded white primary--text">
      <p class="font-weight-bold">{{computedExperience.description}}</p>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import CvButtons from "@/components/CvButtons.vue";
import common from "../Utils/Common";
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
      ...mapMutations({
        editExperience:'cv/editExperience',
        manageModal:'modal/manageModal',
        hideModal:'modal/hide'
      }),
    ...mapActions({
      delete:'cv/delete'
    }),

    removeExperience: function (){
      this.manageModal({
        title: "Remove Experience",
        text: "Are you sure ?",
        textBtnNot:'No',
        onClickYes: () => {
          this.delete({
            id:this.computedExperience.id,
            type:'experiences'
          });
          this.hideModal();
        },
        onClickNot: () => {
          this.hideModal();
        },
      });


    }
  },
  computed: {
    ...mapGetters({
      diffDates:'cv/diffDates'
    }),
    computedExperience(){
      return this.$props.experience;
    }
  },
};
</script>
