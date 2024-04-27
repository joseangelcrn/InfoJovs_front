<template>
  <v-container>
    <main-card>
      <template #title>My Jobs:</template>
      <template #content>
        <v-list-item  three-line class="white rounded mt-2">
          <v-list-item-content>
            <v-list-item-title>Job title</v-list-item-title>
            <v-list-item-subtitle class="green--text">You continue in the selection process</v-list-item-subtitle>
            <v-list-item-subtitle>Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos.</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon class="mt-6">
            <v-btn icon class="align-center"> <v-icon>mdi-eye</v-icon> </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item  three-line class="white rounded mt-2">
          <v-list-item-content>
            <v-list-item-title>Job title</v-list-item-title>
            <v-list-item-subtitle class="red--text">Discarded</v-list-item-subtitle>
            <v-list-item-subtitle>Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos.</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon class="mt-6">
            <v-btn icon class="align-center"> <v-icon>mdi-eye</v-icon> </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item  three-line class="white rounded mt-2">
          <v-list-item-content>
            <v-list-item-title>Job title</v-list-item-title>
            <v-list-item-subtitle class="primary--text">Read CV</v-list-item-subtitle>
            <v-list-item-subtitle>Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos.</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon class="mt-6">
            <v-btn icon class="align-center"> <v-icon>mdi-eye</v-icon> </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item  three-line class="white rounded mt-2">
          <v-list-item-content>
            <v-list-item-title>Job title</v-list-item-title>
            <v-list-item-subtitle class="blue-grey--text">Registered</v-list-item-subtitle>
            <v-list-item-subtitle>Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos.</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon class="mt-6">
            <v-btn icon class="align-center"> <v-icon>mdi-eye</v-icon> </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </template>
      <template #actions>
        Pagination
      </template>
    </main-card>
  </v-container>
</template>

<script>
export default {
  data:()=>({
  })

}
</script>

<style>

</style>