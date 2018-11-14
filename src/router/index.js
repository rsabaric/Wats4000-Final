import Vue from 'vue'
import Router from 'vue-router'
import WordSearch from '@/components/WordSearch'
import Dogs from '@/components/Dogs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WordSearch',
      component: WordSearch
    },
    {
    path: '/Dogs',
    name: 'Dogs',
    component: Dogs
    }
  ]
})
