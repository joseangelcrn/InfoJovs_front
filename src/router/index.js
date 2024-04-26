import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import JobView from '@/views/JobView.vue'
import JobCrudView from '@/views/JobCrudView.vue'
import MyJobsView from '@/views/MyJobsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: JobView
  },
  {
    path: '/offer_job',
    name: 'offerJob',
    component: JobCrudView
  },
  {
    path: '/my_jobs',
    name: 'myJobs',
    component: MyJobsView
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

// {
//   title: "Jobs",
//   icon: "mdi-magnify-expand",
//   url: "/jobs",
//   role: "employer",
// }, //Employer
// {
//   title: "Offer a Job",
//   icon: "mdi-draw",
//   url: "/offer_job",
//   role: "recruiter",
// }, //Recruiter
// {
//   title: "My Jobs",
//   icon: "mdi-form-select",
//   url: "/my_jobs",
//   role: null,
// }, //Employer
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
