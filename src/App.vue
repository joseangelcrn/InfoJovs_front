<template>
  <v-app>
    <!-- Auth view -->
    <v-main v-if="user.data">
      <v-card class="mx-auto overflow-hidden authLayout">
        <v-app-bar color="primary" dark>
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>InfoJovs</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="primary--text text--accent-4"
            >
              <v-list-item to="/home">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item
                v-for="(entry, index) in entries"
                :key="index"
                :to="entry.url"
              >
                <v-list-item-icon>
                  <v-icon>{{ entry.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ entry.title }}</v-list-item-title>
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
        <router-view />
        <modal/>
      </v-card>
    </v-main>

    <!-- No auth view -->
    <v-main class="bgColorPrimary" v-else>
      <router-view />
    </v-main>
  </v-app>
</template>
<style scoped>
.bgColorPrimary {
  background-color: #03a9f4;
}

.authLayout {
  height: 100%;
  background: #03a8f41b;
}
</style>
<script>
import { mapMutations, mapState } from "vuex";
import Modal from "./components/Modal.vue";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    entries: [
      {
        title: "Jobs",
        icon: "mdi-magnify-expand",
        url: "/jobs",
        role: "employer",
      }, //Employer
      {
        title: "Offer a Job",
        icon: "mdi-draw",
        url: "/offer_job",
        role: "recruiter",
      }, //Recruiter
      {
        title: "My Jobs",
        icon: "mdi-form-select",
        url: "/my_jobs",
        role: null,
      }, //Employer and Recruiter
    ],
  }),
  methods: {
    ...mapMutations({
      removeUser: 'user/removeUser',
      manageModal:'modal/manageModal',
      hideModal:'modal/hide'
    }),
    logout: function () {
      console.log("log oout !");
      this.removeUser();
      this.$router.push({ name: "login" });
    },

  },
  computed: {
    ...mapState(["user"]),
  },
  mounted: function() {
    //Example how work custom modal => 

    // this.manageModal({
    //   title:'Titulo',
    //   text:'Mi texto',
    //   onClickYes:()=>{console.log("Si modificado"); this.hideModal()},
    //   onClickNot:()=>{console.log("No modificado");this.hideModal()},
    // });
  },
};
</script>
