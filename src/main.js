// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-ls'
import * as VueGoogleMaps from 'vue2-google-maps'

let options = {
  namespace: 'dogApp__'
}

Vue.use(VueLocalStorage, options);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA63PM8wLyUAsL6AT3MVuxUszbVQ_KBJUE',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
