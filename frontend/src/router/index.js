import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import dashboard from '../views/dashboard.vue'
import toyApp from '../views/toyApp.vue'
import toyEdit from '../views/toyEdit.vue'
import toyDetails from '../views/toyDetails.vue'
import userForm from '../views/userForm.vue'
import userProfile from '../views/userProfile.vue'
import reviewEdit from '../views/reviewEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/toy',
    name: 'toyApp',
    component: toyApp,
  },
  {
    path: '/toy/edit/:id?',
    name: 'toyEdit',
    component: toyEdit
  },
  {
    path: '/toy/:id',
    name: 'toyDetails',
    component: toyDetails
  },
  {
    path: '/user',
    name: 'loginPage',
    component: userForm
  },
  {
    path: '/user/:id',
    name: 'userProfile',
    component: userProfile
  },
  {
    path: '/review/:id',
    name: 'reviewEdit',
    component: reviewEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
