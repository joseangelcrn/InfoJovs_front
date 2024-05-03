import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import JobCrudView from "@/views/JobCrudView.vue";
import SignUpView from "@/views/SignUpView.vue";
import MyCandidaturesView from "@/views/MyCandidaturesView.vue";
import JobFinderView from "@/views/JobFinderView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta:{auth:false}
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
    meta:{auth:false}
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta:{auth:true}
  },
  {
    path: "/jobs",
    name: "jobs",
    component: JobFinderView,
    meta:{auth:true}
  },
  {
    path: "/offer_job/:id?",
    name: "offerJob",
    component: JobCrudView,
    meta:{auth:true,role:'recruiter'}
  },
  {
    path: "/my_candidatures",
    name: "myCandidatures",
    component: MyCandidaturesView,
    meta:{auth:true,role:'employee'}
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});



router.beforeEach(async(to, from, next) => {
  console.log("middleware");
  let token = null;
  let data = null;
  let roles = [];

  try {
    await store.dispatch('user/info');
    let user  = store.state.user;
    token = user.token;
    data = user.data;
    roles = user.roles;
  } catch (error) {
    console.error('error in middleware routes');
    store.commit('user/removeToken');
  }

  if (to.name == 'notFound' && to.path != '/') {
    next();
  }
  
  //Token checks
  else if (!token && (to.meta.auth || to.path == '/')) {
    next('/login');
  }
  else if(token && (!to.meta.auth || to.path == '/')){
    next('/home')
  }

  //Normal way
  next()

});

export default router;
