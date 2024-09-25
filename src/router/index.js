import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import view from "../views/mockupsView.vue"

import loginView from "../views/addNewUser.vue"
import users from "../views/usersView.vue"
import chooseLang from "../views/chooseCountry.vue"
import user from "../views/editUser.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path : '/view',
      component : view
    },
    {
      path : '/addUser',
      component : loginView
    },
    {
      path : '/users',
      component : users
    },
    {
      path : '/choose',
      component : chooseLang
    },
    {
      path : '/user/:id',
      component : user
    }
  ]
})

export default router
