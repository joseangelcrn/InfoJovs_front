<template>
  <v-container>
    <main-card>
      <template #title>My Jobs:</template>
      <template #content>
        <job-preview
          title="Job Title"
          description="Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos."
          statusText="You continue in the selection process"
          statusColor="green"
        />
        <job-preview
          title="Job Title"
          description="Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos."
          statusText="Discarded"
          statusColor="red"
        />
        <job-preview
          title="Job Title"
          description="Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos."
          statusText="Read CV"
          statusColor="primary"
        />
        <job-preview
          title="Job Title"
          description="Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos."
          statusText="Registered"
          statusColor="blue-grey"
        />
      </template>
      <template #actions>
        <v-pagination v-on:input="onChangePage" color="primary" v-model="currentPage" total-visible="10" :length="pageLength"></v-pagination>
      </template>
    </main-card>
  </v-container>
</template>

<script>
import JobPreview from "@/components/JobPreview.vue";
export default {
  components: { JobPreview },
  data: () => ({
    currentPage: 1,
    pageLength:50,

  }),
  methods: {
    onChangePage: function (){
      console.log('on change page !');
    }
  },

};
</script>

<style></style>
