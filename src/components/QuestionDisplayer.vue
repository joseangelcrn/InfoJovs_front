<template>
  <main-card>
    <template #title>
        <div class="mr-auto">
          {{question.title}}
        </div>
        <div v-if="edit_mode">
          <v-btn  style="height: 40px" color="white primary--text mr-1" x-small>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn   style="height: 40px" color="white red--text mr-1" x-small @click="removeQuestion(index)" >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </div>
    </template>
    <template #content>
       <div class="white--text font-weight-bold" style="height: 150px">
         <div v-if="question.type === 'free'">
           <v-textarea
               solo
               outlined
               background-color="white"
               readonly
               no-resize
               placeholder="Free answer"/>

         </div>
         <div v-else>
           <ul>
             <li v-for="(answer,index) in question.answerOptions" >{{answer.text}}</li>
           </ul>
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
