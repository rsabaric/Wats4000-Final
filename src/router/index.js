import Vue from 'vue'
import Router from 'vue-router'
import Dogs from '@/components/Dogs'
import CitySearch from '@/components/CitySearch'
import Map from '@/components/Map'
import End from '@/components/End'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dogs',
      component: Dogs
    },
    {
      path: '/citysearch',
      name: 'CitySearch',
      component: CitySearch
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/end',
      name: 'End',
      component: End
    }
  ]
})
