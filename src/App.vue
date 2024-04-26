<template>
  <v-app>
    <v-main v-if="user.data">
      <v-card class="mx-auto overflow-hidden">
        <v-app-bar color="deep-purple" dark>
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>InfoJovs</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item v-on:click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
    <router-view/>

      </v-card>
      
    </v-main>

    <v-main v-else>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    ...mapMutations('user',['removeUser']),
    logout: function (){
      console.log('log oout !');
      this.removeUser();
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted: () => {
    console.log("mounted !");
  },
};
</script>
