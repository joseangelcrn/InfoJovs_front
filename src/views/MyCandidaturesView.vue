<template>
  <v-container>
    <main-card >
      <template #title>My Candidatures:</template>
      <template #content>
        <job-preview
          v-for="(candidature, index) in job.candidatures"
          :key="index"
          :job="item"
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
      await this.loadMyCandidatures(this.filter);
    } 
  },
  computed: {
    ...mapState(["job"]),
  },
  async mounted() {    
    await this.loadMyCandidatures();
  },
};
</script>

<style></style>
