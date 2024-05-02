<template>
  <v-container>
    <main-card :loading="loading">
      <template #title>My Candidatures:</template>
      <template #content>
        <job-preview
          v-for="(candidature, index) in job.candidatures"
          :key="index"
          :title="candidature.job.title"
          :description="candidature.job.description"
          :statusText="candidature.status.name"
          :statusColor="statusColor(candidature.status.id)"
        />
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
  </v-container>
</template>

<script>
import JobPreview from "@/components/JobPreview.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: { JobPreview },
  data: () => ({
    loading:true
  }),
  methods: {
    ...mapActions({
      loadMyCandidatures: "job/myCandidatures",
    }),
    ...mapMutations({
      setCurrentPage: "job/setCurrentPage",
      setCandidatures:'job/setCandidatures'
    }),
    onChangePage:async function (newCurrentPage) {
      console.log("on change page !");
      console.log(newCurrentPage);
      this.setCurrentPage(newCurrentPage);
      this.setCandidatures([]);
      this.loading = true;
      await this.loadMyCandidatures(this.filter);
      this.loading = false;
    },
    statusColor: function (statusId) {
      switch (statusId) {
        case 1:
          return "blue-grey";
          break;
        case 2:
          return "primary";
          break;
        case 3:
          return "green";
          break;
        case 4:
          return "red";
          break;

        default:
          break;
      }
    },
  },
  computed: {
    ...mapState(["job"]),
  },
  async mounted() {    
    this.loading  = true;
    this.setCandidatures([]);
    await this.loadMyCandidatures();
    this.loading  = false;
  },
};
</script>

<style></style>
