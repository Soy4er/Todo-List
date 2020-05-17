import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import UpdateNote from '@/views/UpdateNote'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
    },
    {
      path: '/update-note/:id',
      component: UpdateNote,
      name: 'updateNote',
      props: true
    },
  ]
})