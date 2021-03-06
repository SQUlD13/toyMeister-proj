import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './style/scss/main.scss'




//import {pagination} from 'element-ui'

Vue.use(element)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDQvpBhmW91S6CVbdUgQFCVRDzXI_gCJuc',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
