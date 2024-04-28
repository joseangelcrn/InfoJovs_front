<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <main-card>
            <template #title>Create a Job Offer:</template>
            <template #content>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    dense
                    x-small
                    background-color="white"
                    outlined
                    placeholder="Job Title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    name=""
                    placeholder="Job description"
                    value=""
                    background-color="white"
                  ></v-textarea>
                </v-col>
              </v-row>
            </template>
            <template #actions>
              <v-btn small class="primary--text">Save</v-btn>
            </template>
          </main-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
