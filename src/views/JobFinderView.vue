<template>
  <v-container>
    <!-- Finder -->
    <v-row>
      <v-col>
        <main-card>
          <template #content>
            <v-row>
              <v-col sm="3" md="3" lg="3" cols="12">
                <v-text-field
                  solo
                  dense
                  x-small
                  background-color="white"
                  outlined
                  placeholder="Job Title"
                  v-model="filter.title"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex"  sm="3" md="3" lg="3" cols="12">
                <v-combobox
                    v-model="filter.tags"
                    :items="filter.tagsItems"
                    chips
                    clearable
                    multiple
                    solo
                    dense
                    x-small
                    counter="5"
                >
                  <template
                      v-slot:counter="{props}"
                  >
                   <span :class="{'white--text': (props.value <= props.max),'red--text': props.value > props.max}"><b>Tags: </b> {{props.value}}/{{props.max}}</span>
                  </template>
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
              <v-col class="d-flex"  sm="3" md="3" lg="3" cols="12">
                <v-checkbox
                  color="blue-darken-4"
                  class="mt-0 white--text align-self-center"
                  v-model="filter.ignore_own"
                  :label="textCheckBox"
                >
                  <template #label>
                    <b class="white--text">{{textCheckBox}}</b>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </template>
          <template #actions>
            <v-btn
              v-on:click="onSearch"
              small
              text
              class="ml-2 white primary--text"
              :disabled="disableSearchButton"
            >
              Search
            </v-btn>
          </template>
        </main-card>
      </v-col>
    </v-row>

    <!-- Found results -->
    <v-row>
      <v-col>
        <h5>Finder result</h5>
        <main-card>
          <template #title>Search results:</template>
          <template #subtitle>{{ job.pagination.totalItems }} results</template>
          <template #content>
            <v-list-item
              v-for="(item, index) in job.data"
              :key="index"
              three-line
              class="white rounded mt-2"
            >
              <job-preview
                :job="item"
                :canEdit="item.recruiter_id === user.data.id"
              />
            </v-list-item>
          </template>
          <template #actions>
            <v-pagination
              v-on:input="onChangePage"
              color="primary"
              v-model="job.pagination.currentPage"
              :total-visible="job.pagination.perPage"
              :length="job.pagination.lastPage"
            ></v-pagination>
          </template>
        </main-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JobPreview from "@/components/JobPreview.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: { JobPreview },
  data: () => ({
    filter: {
      title: "",
      ignore_own: false,
      tags:[],
      tagsItems:[]
    },
  }),
  methods: {
    ...mapActions({
      searchJobs: "job/search",
    }),
    ...mapMutations({
      setCurrentPage: "job/setCurrentPage",
      setJobs: "job/setJobs",
      resetPagination:"job/resetPagination"
    }),
    onSearch: async function () {
      await this.setCurrentPage(1);
      await this.searchJobs(this.filter);
    },
    onChangePage: async function (newCurrentPage) {
      this.setCurrentPage(newCurrentPage);
      await this.searchJobs(this.filter);
    },
    removeTag: function (item) {
      this.filter.tags.splice(this.filter.tags.indexOf(item), 1);
    },
  },
  computed: {
    ...mapState(["job", "user"]),
    textCheckBox() {
      if (this.$common.hasRole('recruiter')) {
        return "Ignore my offers";
      }
      return "Ignore my Candidatures";
    },
    disableSearchButton(){
      return this.filter.tags.length > 5;
    }
  },
  beforeMount() {
    this.setJobs([]);
    this.resetPagination();

  },
};
</script>

<style>
</style>
