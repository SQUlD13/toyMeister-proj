import Vue from 'vue'
import Vuex from 'vuex'

import toyStore from './modules/toyStore.js'
import userStore from './modules/userStore.js'

Vue.use(Vuex)

const PAGE_SIZE = 5

export default new Vuex.Store({
  modules: {
    toyStore, userStore
  }
})
