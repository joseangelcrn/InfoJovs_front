<template>
  <v-app>
    <v-main>
      <v-card class="mx-auto overflow-hidden  authLayout" :color="user.token ? 'white' :'primary'">
        <template v-if="user.token">
          <v-app-bar color="primary" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title
              >InfoJovs <b v-if="general.title">| {{ general.title }}</b>
            </v-toolbar-title>
          </v-app-bar>
          <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
              <v-list-item-group
                v-model="group"
                active-class="primary--text text--accent-4"
              >
                <v-list-item to="/home" v-on:click="onClickNavLink('Home')">
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item
                  v-for="(entry, index) in entriesForCurrentRole"
                  :key="index"
                  :to="entry.url"
                  v-on:click="onClickNavLink(entry.title)"
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
        </template>
        <router-view />
        <modal />
      </v-card>
    </v-main>
  </v-app>
</template>
<style scoped>
.authLayout {
  height: 100%;
  background: #03a8f41b;
}
</style>
<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    entries: [
      {
        title: "Jobs Finder",
        icon: "mdi-magnify-expand",
        url: "/jobs",
        role: null,
      }, //Employer
      {
        title: "Offer a Job",
        icon: "mdi-draw",
        url: "/offer_job",
        role: "recruiter",
      }, //Recruiter
      {
        title: "My Candidatures",
        icon: "mdi-form-select",
        url: "/my_candidatures",
        role: "employee",
      } //Employer
    ],
  }),
  methods: {
    ...mapMutations({
      removeToken: "user/removeToken",
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
      setTitle: "general/setTitle",
    }),
    ...mapActions({
      userInfo: "user/info",
      userLogout: "user/logout",
    }),
    logout: async function () {
      await this.userLogout();
      this.$router.push({ name: "login" });
    },
    onClickNavLink: function (title) {
      this.$common.setTitle(title);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    ...mapState(["user", "general"]),
    entriesForCurrentRole(){
      return this.entries.filter((entry)=>{
        return this.$common.hasRole(entry.role);
      });
    }
  },
  mounted: function () {
    //Resolve title:
    this.$common.setTitle();
    // console.log('process.env en app.vue = ',process.env)
    //Example how work custom modal =>
    // this.manageModal({
    //   title:'Titulo',
    //   text:'Mi texto',
    //   onClickYes:()=>{console.log("Si modificado"); this.hideModal()},
    //   onClickNot:()=>{console.log("No modificado");this.hideModal()},
    // });
  },
  updated() {
    this.$common.setTitle();    
  },
};
</script>
