<template>
  <modal-extended
      style="z-index: 10; position: absolute"
      @clickOutside="question.show = false"
      v-if="question"
      :show="question.show"
  >
    <template #title>
      <v-btn-toggle
          v-model="question.type"
          tile
          color="white primary--text rounded"
          group
      >
        <v-btn value="free"> Free Answer</v-btn>

        <v-btn value="options"> Answer with options</v-btn>
      </v-btn-toggle>
    </template>
    <template #content>
      <v-container class="bg-white">
        <v-row>
          <v-col>
            <v-text-field
                v-model="question.title"
                solo
                dense
                x-small
                background-color="white"
                outlined
                placeholder="Question.."
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="question.type == 'free'">
          <v-col>
            <v-textarea
                disabled
                placeholder="Free answer"
                solo
                dense
                x-small
                background-color="white"
                outlined
            ></v-textarea>
          </v-col>
        </v-row>
        <div v-else>
          <div class="d-flex">
            <v-text-field
                v-model="question.newAnswer"
                solo
                dense
                x-small
                background-color="white"
                outlined
                placeholder="Option.."
                clearable
            ></v-text-field>
            <v-btn
                :disabled="
                !question.newAnswer ||
                question.newAnswer.trim().length === 0 ||
                isEditMode
              "
                class="primary--text"
                style="height: 40px"
                @click="addAnswer"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn
            >
          </div>
          <div id="answer_container" style="max-height: 150px; overflow-y: scroll;">
            <div class="d-flex" :class="(index !== 0 ? 'mt-1' : '')" v-for="(answer,index) in question.answerOptions">
              <!--DATA WHEN YOU ARE EDITING SOME ANSWER-->
              <v-text-field :ref="'edited_answer_'+index" v-if="answer.edit" solo outlined dense :value="answer.text">
              </v-text-field>
              <!--DATA WHEN YOU ARE NOT EDITING ANY ANSWER-->
              <v-chip class="mr-auto"
                      :key="index"
                      color="white primary--text"
                      label
                      v-if="!isEditMode"
              >
                {{ answer.text }}
              </v-chip>

              <!--BUTTONS WHEN YOU ARE NOT EDITING ONE ANSWER-->
              <v-btn style="height: 32px" color="white primary--text mr-1" v-if="!isEditMode" x-small
                     @click="setEditMode(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <!--BUTTONS WHEN YOU ARE EDITING ONE ANSWER-->
              <div v-else-if="answer.edit" class="ml-2">
                <v-btn style="height: 40px" color="white primary--text mr-1" x-small @click="updateAnswerOption({index:index,new_text:$refs['edited_answer_'+index][0].$refs.input._value})">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn style="height: 40px" color="white primary--text mr-1" x-small @click="setEditMode(-1)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </template>
    <template #actions>
      <v-btn
          v-on:click="question.show = false"
          small
          class="primary--text"
          :disabled="disableAddNewQuestion"
          @click="storeQuestion"
      >Save Question
      </v-btn
      >
      <v-btn
          v-on:click="question.show = false"
          small
          class="light-blue darken-4 primary--text"
      >Cancel
      </v-btn
      >
    </template>
  </modal-extended>
</template>
<style>
/*
CUSTOM SCROLL BAR (start)
*/

/* width */
#answer_container::-webkit-scrollbar {
  width: 10px;
}

/* Track */
#answer_container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
#answer_container::-webkit-scrollbar-thumb {
  background: #ffffff;
  border-radius: 10px;
}

/* Handle on hover */
#answer_container::-webkit-scrollbar-thumb:hover {
  background: #d9d9d9;
}

/*
CUSTOM SCROLL BAR (end)
*/
</style>
<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "question-maker",
  props: [],
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    ...mapMutations({
      addAnswer: "question/addAnswer",
      setEditMode: "question/setEditMode",
      // update: "question/update"
    }),
    ...mapActions({
      updateAnswerOption:"question/updateAnswerOption",
      storeQuestion:"question/store"
    })

  },
  computed: {
    ...mapState(['question']),
    ...mapGetters({
      isEditMode: 'question/isEditMode'
    }),

    disableAddNewQuestion() {
      let {type, title, answerOptions} = this.question;

      if (title.trim().length == 0 || (type != "free" && answerOptions.length == 0)) {
        return true;
      }
      return false;
    },
  },
  created() {
    console.log("question maker - created !");
  },
  mounted() {
    console.log("question maker - mounted !");
    this.loaded = true;
    console.log('question = ', this.question);
    console.log('store', this.$store.state.question)

  },
  updated() {
    console.log("question maker - updated !");

  },
};
</script>
