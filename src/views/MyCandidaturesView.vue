<template>
  <v-container>
    <main-card>
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
import { mapActions, mapState } from "vuex";
export default {
  components: { JobPreview },
  data: () => ({
    currentPage: 1,
    pageLength: 50,
  }),
  methods: {
    ...mapActions({
      loadMyCandidatures: "job/myCandidatures",
    }),
    onChangePage: function () {
      console.log("on change page !");
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
  mounted() {
    console.log("mounted !!");
    this.loadMyCandidatures();
  },
};
</script>

<style></style>
