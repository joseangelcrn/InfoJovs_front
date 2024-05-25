<template>
  <div>
    <v-container>
      <v-row d-flex justify="center">
        <v-col cols="10">
          <main-card>
            <template #title
              >{{ id ? "Edit" : "Create" }} a Job Offer:</template
            >
            <template #content>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="title"
                    hint="Title which shortly describe job"
                    solo
                    dense
                    x-small
                    background-color="white"
                    outlined
                    placeholder="Full-Stack PHP & Vue"
                    :error="errors.title != null"
                    :error-messages="errors.title"
                  >
                    <template #message="{ message }">
                      <b class="white rounded-pill pa-3">{{ message }}</b>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="description"
                    :hint="'Describe extensively information about job. Such as required experience , which technologies you need to be experienced,retributions..'"
                    solo
                    outlined
                    placeholder="Job description"
                    background-color="white"
                    :error="errors.description != null"
                    :error-messages="errors.description"
                    counter
                    :height="textAreaHeight"
                  >
                    <template #counter="{ props }">
                      <b class="white--text">{{ props.value }}</b>
                    </template>
                    <template #message="{ message }">
                      <b class="white rounded-pill pa-3">{{ message }}</b>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-combobox
                    v-model="tags"
                    :items="items"
                    chips
                    clearable
                    hint="Tags which describes job"
                    multiple
                    solo
                    dense
                    @change="onChangeTags"
                    :error="errors.tags != null"
                    :error-messages="errors.tags"
                  >
                    <template
                      v-slot:selection="{ attrs, item, select, selected }"
                    >
                      <v-chip
                        class="my-2"
                        color="primary"
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="removeTag(item)"
                      >
                        <strong>{{ item }}</strong
                        >&nbsp;
                      </v-chip>
                    </template>
                    <template #message="{ message }">
                      <b class="white rounded-pill pa-3">{{ message }}</b>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row v-if="question.data.length > 0">
                <v-col cols="12">
                  <v-sheet elevation="6">
                    <v-tabs
                        background-color="blue darken-4"
                        dark
                        next-icon="mdi-arrow-right-bold-box-outline"
                        prev-icon="mdi-arrow-left-bold-box-outline"
                        show-arrows
                        v-model="questionTab"
                    >
                      <v-tabs-slider color="white"></v-tabs-slider>
                      <v-tab
                          v-for="(question,index) in question.data"
                          :key="index"
                      >
                        Question n-{{index+1}}
                      </v-tab>
                    </v-tabs>

                      <v-tabs-items v-model="questionTab">
                        <v-tab-item
                            v-for="(item,index) in question.data"
                            :key="index"
                        >
                          <question-displayer edit_mode="true" :index="index" :question="item"/>
                        </v-tab-item>
                      </v-tabs-items>

                  </v-sheet>
                </v-col>
              </v-row>
            </template>
            <template #actions>
              <v-btn v-on:click="onSave" small class="primary--text">{{
                id ? "Update" : "Save"
              }}</v-btn>
              <v-btn
                v-on:click="openQuestionsModal"
                small
                class="light-blue darken-4 primary--text"
                >Add Question</v-btn
              >
            </template>
          </main-card>
            <question-maker />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import router from "@/router";
import {mapActions, mapMutations, mapState} from "vuex";
import QuestionMaker from '@/components/QuestionMaker.vue';
import QuestionDisplayer from "@/components/QuestionDisplayer.vue";
export default {
  components: {QuestionDisplayer, QuestionMaker },
  data() {
    return {
      id: null,
      title: "",
      description: "",
      tags: [],
      items: [],
      errors: {
        title: null,
        description: null,
        tags: null,
      },
      questionTab:1
    };
  },
  methods: {
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
      closeQuestionModal:"question/closeModal",
    }),
    ...mapActions({
      openQuestionsModal:"question/openModal",
    }),
    onSave: async function () {
      this.errors = {
        title: null,
        description: null,
        tags: null,
      };

      if (this.title.trim().length === 0) {
        this.errors.title = "Title can not be empty.";
      } else if (this.description.trim().length === 0) {
        this.errors.description = "Description can not be empty";
      } else if (this.description.length > 2000) {
        this.errors.description = "Max characters : 2000";
      } else if (this.tags.length < 3) {
        this.errors.tags = "Please add, at least, 3 tags.";
      } else {
        try {
          if (this.id) {
            let response = await this.$proxy.updateJob({
              id: this.id,
              title: this.title,
              description: this.description,
              tags: this.tags,
            });
            var message = response.data.message;
          } else {
            let response = await this.$proxy.createJob({
              title: this.title,
              description: this.description,
              tags: this.tags,
            });
            var message = response.data.message;
          }

          this.manageModal({
            title: "Info",
            text: message,
            onClickYes: () => {
              this.hideModal();
              this.$router.push({ name: "home" });
            },
          });
        } catch (error) {
          var message =
            error.response.data.message ??
            "Something was wrong. Please, try again later.";

          this.manageModal({
            title: "Error",
            type: "error",
            text: message,
            onClickYes: () => {
              this.hideModal();
            },
          });
        }
      }
    },
    onChangeTags: function (data) {
      let newTag = this.tags[this.tags.length - 1];
    },
    removeTag: function (item) {
      this.tags.splice(this.tags.indexOf(item), 1);
    },
  },
  computed: {
    ...mapState({
      user: "user",
      question: "question"
    }),
    textAreaHeight() {
      let length = this.description.length;
      if (length <= 300) {
        return 250;
      } else if (length > 300 && length <= 600) {
        return 400;
      }

      return 600;
    },
  },
  mounted: async function () {
    if (typeof this.$route.params.id !== "undefined") {
      this.id = this.$route.params.id;
      try {
        let response = await this.$proxy.getJobById(this.id);
        let { job } = response.data;
        if (job.recruiter_id != this.user.data.id) {
          this.manageModal({
            title: "Error",
            type: "error",
            text: "Forbidden - Permission denied",
            onClickYes: () => {
              router.push({ name: "home" });
              this.hideModal();
            },
          });
        }
        this.title = job.title;
        this.description = job.description;
        this.tags = this.$common.pluck(job.tags, "name");
      } catch (error) {
        this.manageModal({
          title: "Error",
          type: "error",
          text: "Job Not Found",
          onClickYes: () => {
            router.push({ name: "home" });
            this.hideModal();
          },
        });
      }
    }
  },
};
</script>

<style></style>
