<template>
  <v-list-item three-line class="white rounded mt-2">
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle :class="(statusColor ?? 'black') + '--text'">{{
        statusText
      }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
      <v-list-item-subtitle class="mt-1">
        <v-chip  v-for="(tag,index) in tags" :key="index" class="mr-1" small color="primary" >{{tag.name}}</v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon class="mt-6">
      <v-btn icon class="align-center"> <v-icon>mdi-eye</v-icon> </v-btn>
    </v-list-item-icon>
  </v-list-item>
</template>
<script>
export default {
  name: "job-preview",
  props: ["title", "description", "statusText", "statusColor",'tags'],

  data() {
    return {};
  },
};
</script>
