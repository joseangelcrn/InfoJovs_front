import Vue from "vue";
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
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/jobs",
    name: "jobs",
    component: JobView,
  },
  {
    path: "/offer_job",
    name: "offerJob",
    component: JobCrudView,
  },
  {
    path: "/my_jobs",
    name: "myJobs",
    component: MyJobsView,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("middleware");
  let token = localStorage.getItem("token") ?? null;

  if ((to.name == "login" || to.path == "/") && token) {
    next({ name: "home" });
  } else if ((to.name == "home" || to.path == "/") && !token) {
    next({ name: "login" });
  }

  next();
});

export default router;
