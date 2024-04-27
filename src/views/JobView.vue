<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="primary" elevation="2">
          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  dense
                  x-small
                  background-color="white"
                  outlined
                  placeholder="Key Workd"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  dense
                  background-color="white"
                  outlined
                  placeholder="Value"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn text class="ml-2   white primary--text"> Search </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h5>Finder result</h5>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  methods: {},
};
</script>

<style>
</style>