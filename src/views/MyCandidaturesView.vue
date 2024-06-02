<template>
  <v-container>
    <main-card >
      <template #title>My Candidatures:</template>
      <template #content>
        <job-preview
          v-for="(candidature, index) in candidature.data"
          :key="index"
          :job="candidature.job"
          :candStatus="candidature.status"
        />
      </template>
      <template #actions>
        <v-pagination
          v-on:input="onChangePage"
          color="primary"
          v-model="candidature.pagination.currentPage"
          :total-visible="candidature.pagination.perPage"
          :length="candidature.pagination.lastPage"
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
      loadMyCandidatures: "candidature/myCandidatures",
    }),
    ...mapMutations({
      setCurrentPage: "candidature/setCurrentPage",
    }),
    onChangePage:async function (newCurrentPage) {
      this.setCurrentPage(newCurrentPage);
      await this.loadMyCandidatures(this.filter);
    } 
  },
  computed: {
    ...mapState(["job",'candidature']),
  },
  async mounted() {    
    await this.loadMyCandidatures();
  },
};
</script>

<style></style>
