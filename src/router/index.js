import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import JobView from "@/views/JobView.vue";
import JobCrudView from "@/views/JobCrudView.vue";
import MyJobsView from "@/views/MyJobsView.vue";
import SignUpView from "@/views/SignUpView.vue";

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
    component: JobView,
    meta:{auth:true}
  },
  {
    path: "/offer_job",
    name: "offerJob",
    component: JobCrudView,
    meta:{auth:true}
  },
  {
    path: "/my_jobs",
    name: "myJobs",
    component: MyJobsView,
    meta:{auth:true}
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
    meta:{auth:false}
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
  let roles = null;

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
 

  if (!token && to.meta.auth) {
    next('/login');
  }
  else if(token && !to.meta.auth){
    next('/home')
  }
  else{
    next()
  }

});

export default router;
