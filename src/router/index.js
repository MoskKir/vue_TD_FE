import Vue from 'vue';
import VueRouter from 'vue-router';
import Todos from '../views/Todos.vue';
import Login from '../views/Login.vue';
import Todoitem from '../views/Todoitem.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/todo/:id',
    name: 'TodoItem',
    component: Todoitem,
    props: true
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
