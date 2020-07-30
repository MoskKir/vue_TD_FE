import Vue from 'vue';
import VueRouter from 'vue-router';
import Todos from '../views/Todos.vue';
import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';
import Todoitem from '../views/Todoitem.vue';
import User from '../views/User.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/auth/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: Signup
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
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
