<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <main-card>
            <template #title>Create a Job Offer:</template>
            <template #content>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    dense
                    x-small
                    background-color="white"
                    outlined
                    placeholder="Job Title"
                    :error="errors.title != null"
                    :error-messages="errors.title"
                    >
                  <template #message="{message}">
                    <b class="white rounded-pill pa-3">{{message}}</b>
                  </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="description"
                    outlined
                    name=""
                    placeholder="Job description"
                    value=""
                    background-color="white"
                    :error="errors.description != null"
                    :error-messages="errors.description"
                  >
                  <template #message="{message}">
                    <b class="white rounded-pill pa-3">{{message}}</b>
                  </template>
                </v-textarea>
                </v-col>
              </v-row>
            </template>
            <template #actions>
              <v-btn v-on:click="onSave" small class="primary--text">Save</v-btn>
            </template>
          </main-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      errors: {
        title: null,
        description: null,
      },
    };
  },
  methods: {
    onSave: function  () {
      this.errors = {
        title: null,
        description: null,
      };

      if (this.title.trim().length === 0) {
        this.errors.title = "Title can not be empty.";
      } else if (this.description.trim().length === 0) {
        this.errors.description = "Description can not be empty";
      } else {
        console.log("save Job !");
      }
    },
  },
};
</script>

<style></style>
