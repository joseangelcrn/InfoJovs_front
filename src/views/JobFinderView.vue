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
              <v-col sm="3" md="3" lg="3" cols="12">
                <v-text-field
                  solo
                  dense
                  background-color="white"
                  outlined
                  placeholder="Disabled Input"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template #actions>
            <v-btn
              v-on:click="onSearch"
              small
              text
              class="ml-2 white primary--text"
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
          <template #subtitle>{{ job.data.length }} results</template>
          <template #content>
            <v-list-item
              v-for="(item, index) in job.data"
              :key="index"
              three-line
              class="white rounded mt-2"
            >
              <job-preview
                :title="item.title"
                :description="item.description"
                :tags="item.tags"
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
    },
  }),
  methods: {
    ...mapActions({
      searchJobs: "job/search",
    }),
    ...mapMutations({
      setCurrentPage: "job/setCurrentPage",
    }),
    onSearch: async function () {
      await this.setCurrentPage(1);
      console.log("on search !");
      console.log("filter = ", this.filter);
      await this.searchJobs(this.filter);
    },
    onChangePage:async function (newCurrentPage) {
      console.log("on change page !");
      console.log(newCurrentPage);
      this.setCurrentPage(newCurrentPage);
      await this.searchJobs(this.filter);
    },
  },
  computed: {
    ...mapState(["job"]),
  },
};
</script>

<style>
</style>
