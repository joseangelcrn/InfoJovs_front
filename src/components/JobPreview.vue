<template>
  <v-list-item three-line class="white rounded mt-2">
    <v-list-item-content>
      <v-list-item-title>{{ job.title }}</v-list-item-title>
      <v-list-item-subtitle v-if="job.status" :class="statusColor  + '--text'">{{
        job.status.name
      }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ job.description }}</v-list-item-subtitle>
      <v-list-item-subtitle class="mt-1">
        <v-chip  v-for="(tag,index) in job.tags" :key="index" class="mr-1" small color="primary" >{{tag.name}}</v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon class="mt-6">
      <v-btn icon class="align-center" :to="{name:'jobDetails',params:{id:job.id}}" > <v-icon>mdi-eye</v-icon> </v-btn>
    </v-list-item-icon>
  </v-list-item>
</template>
<script>
export default {
  name: "job-preview",
  props: ['job'],

  data() {
    return {};
  },
  methods: {
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
          'black'
          break;
      }
    },
  },
  mounted() {
    // console.log('status',this.$props.job.status);
  },
};
</script>
