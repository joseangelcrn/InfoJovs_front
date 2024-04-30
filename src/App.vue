<template>
  <v-app>
    <!-- Auth view -->
    <v-main v-if="user.token">
      <v-card class="mx-auto overflow-hidden authLayout">
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
                v-for="(entry, index) in entries"
                :key="index"
                :to="entry.url"
                :disabled="mustDisabled(entry)"
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
        <router-view />
        <modal />
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
import { mapActions, mapMutations, mapState } from "vuex";
import Modal from "./components/Modal.vue";
import router from "./router";

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
        role: null,
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
      removeToken: "user/removeToken",
      manageModal: "modal/manageModal",
      hideModal: "modal/hide",
      setTitle: "general/setTitle",
    }),
    ...mapActions({
      userInfo: "user/info",
    }),
    logout: function () {
      console.log("log oout !");
      this.removeToken();
      this.$router.push({ name: "login" });
    },
    mustDisabled: function (entry) {
      let entryRole = entry.role;
      if (entryRole == null || this.user.roles.includes(entryRole)) {
        return false;
      }

      return true;
    },
    onClickNavLink: function (title) {
      this.setTitle(title);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    ...mapState(["user", "general"]),
  },
  mounted: function () {
    //Resolve title:
    let routes = router.options.routes;
    let currentPath = window.location.pathname;

    let matchedRoute = routes.filter((item) => {
      return item.path === currentPath;
    })[0];

    if (typeof matchedRoute !== "undefined") {
      this.setTitle(this.capitalizeFirstLetter(matchedRoute.name));
    }
    
    //Example how work custom modal =>
    // this.manageModal({
    //   title:'Titulo',
    //   text:'Mi texto',
    //   onClickYes:()=>{console.log("Si modificado"); this.hideModal()},
    //   onClickNot:()=>{console.log("No modificado");this.hideModal()},
    // });
    // let that = this;
    // this.userInfo().catch((error) => {
    //   that.manageModal({
    //     title: "Error",
    //     text: "Session expired !",
    //     onClickYes: () => {
    //       this.removeToken();
    //       this.hideModal();
    //       this.$router.push('/login')
    //     },
    //   });
    // });
  },
};
</script>
