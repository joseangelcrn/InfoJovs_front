<template>
  <v-container>
    <v-row>
      <v-col>
        <main-card>
          <template #content>
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
          </template>
          <template #actions>
            <v-btn text class="ml-2 white primary--text"> Search </v-btn>
          </template>
        </main-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h5>Finder result</h5>
        <main-card>
          <template #title>Mi Custom titulo</template>
          <template #subtitle>Mi Subtitle</template>
          <template #content>Content</template>
          <template #actions>Mi Subtitle</template>
        </main-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {  },
  data: () => ({}),
  methods: {},
};
</script>

<style>
</style>