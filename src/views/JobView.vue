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
                  dense
                  x-small
                  background-color="white"
                  outlined
                  placeholder="Key Workd"
                  v-model="filter.keyWord"
                ></v-text-field>
              </v-col>
              <v-col sm="3" md="3" lg="3" cols="12">
                <v-text-field
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
            <v-btn v-on:click="onSearch" small text class="ml-2 white primary--text"> Search </v-btn>
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
          <template #subtitle>{{ jobResults }} results</template>
          <template #content>
            <v-list-item
              v-for="(item, index) in jobResults"
              :key="index"
              three-line
              class="white rounded mt-2"
            >
              <job-preview
                title="Job Title"
                description="Job description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo, beatae laborum ipsa doloribus exercitationem dolores ipsum debitis inventore sint ea nemo voluptate ipsam sit ex sequi eligendi. Saepe, eos."
              />
            </v-list-item>
          </template>
          <template #actions>
            <v-pagination  v-on:input="onChangePage" color="primary"  v-model="currentPage" total-visible="10" :length="pageLength"></v-pagination>
          </template>
        </main-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JobPreview from "@/components/JobPreview.vue";
export default {
  components: { JobPreview },
  data: () => ({
    jobResults: 3,
    currentPage:1,
    pageLength:50,
    filter:{
      keyWord:''
    }
  }),
  methods: {
    onSearch: function (){
      console.log('on search !');
    },
    onChangePage: function (){
      console.log('on change page !');
    }
  },
};
</script>

<style>
</style>
