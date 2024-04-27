import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary:'#03A9F4'

      },
    },
  },
};

export default new Vuetify(opts);
