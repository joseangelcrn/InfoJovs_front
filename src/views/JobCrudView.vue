<template>
  <div>
    <v-container>
      <v-row d-flex justify="center">
        <v-col cols="10">
          <main-card>
            <template #title>{{id ? 'Edit': 'Create'}} a Job Offer:</template>
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
                    <template #message="{ message }">
                      <b class="white rounded-pill pa-3">{{ message }}</b>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
            </template>
            <template #actions>
              <v-btn v-on:click="onSave" small class="primary--text">{{
                id ? "Update" : "Save"
              }}</v-btn>
            </template>
          </main-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import router from "@/router";
import { mapMutations } from "vuex";
export default {
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
    };
  },
  methods: {
    ...mapMutations({
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
    }),
    onSave: async function () {
      this.errors = {
        title: null,
        description: null,
        tags: null,
      };

      if (this.title.trim().length === 0) {
        this.errors.title = "Title can not be empty.";
      } else if (this.tags.length < 3) {
        this.errors.tags = "Please add, at least, 3 tags.";
      } else if (this.description.trim().length === 0) {
        this.errors.description = "Description can not be empty";
      } else {
        console.log("save Job !");
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
          var message = error.response.data.message ?? "Something was wrong. Please, try again later.";

          this.manageModal({
            title: "Error",
            type:'error',
            text:message,
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
      console.log("remove tag");
      this.tags.splice(this.tags.indexOf(item), 1);
    },
  },
  computed:{
    textAreaHeight(){
      let length = this.description.length;
      if (length <= 300) {
        return 250;
      }
      else if (length > 300 && length <= 600 ) {
        return 400;
      }

      return 600;
    }
  },
  mounted: async function () {
    if (typeof this.$route.params.id !== "undefined") {
      this.id = this.$route.params.id;
      let response = await this.$proxy.getJobById(this.id);
      console.log(response);
      this.title = response.data.job.title;
      this.description = response.data.job.description;
      this.tags = this.$common.pluck(response.data.job.tags, "name");
      console.log('length = '+this.description.length);
    }
  },
};
</script>

<style></style>
