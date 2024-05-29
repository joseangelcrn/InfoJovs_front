<template>
  <main-card>
    <template #title>
        <div class="mr-auto">
          {{question.title}}
        </div>
        <div v-if="edit_mode">
          <v-btn  style="height: 30px; width: 30px;"  color="white primary--text mr-1" x-small @click="openModal(index)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn  style="height: 30px; width: 30px;"  color="white red--text mr-1" x-small @click="removeQuestion(index)" >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </div>
    </template>
    <template #content>
       <div class="white--text font-weight-bold" style="height: 150px">
         <div v-if="question.type === 'free'">
           <v-textarea
               v-model="question.value"
               solo
               outlined
               background-color="white"
               :readonly="edit_mode"
               no-resize
               :placeholder="edit_mode ? 'Free answer, employees will write their answers here' : ''"/>

         </div>
         <div v-else class="d-flex flex-column">
           <div v-if="edit_mode">
             <v-chip
                 v-for="(answer,index) in question.answerOptions"
                 :key="index"
                 color="white primary--text"
                 label
                 :class="{'mt-2' : index > 0}"
                 style="width: 100%"
             >
               {{ answer.text }}
             </v-chip>
           </div>
           <div v-else>
             <v-radio-group v-model="question.value">
               <v-radio
                   color="white"
                   v-for="(answer,index) in question.answerOptions"
                   :key="index"
                   :label="answer.text"
                   :value="index"
               ></v-radio>
            </v-radio-group>

           </div>
         </div>
       </div>
    </template>
  </main-card>
</template>
<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "question-displayer",
  props: ['question','index','edit_mode'],
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    ...mapMutations({
      remove: "question/remove",
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
    }),
    ...mapActions({
      openModal:"question/openModal"
    }),

    removeQuestion:function(index){
      this.manageModal({
        title:'Deleting question',
        text:'Are you sure ?',
        textBtnYes:'Yes',
        textBtnNot:'No',
        onClickYes:()=>{
          this.remove(index)
          this.hideModal()
        },
        onClickNot:()=>{
          this.hideModal()
        },
      });
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {


  },
  updated() {

  },
};
</script>
