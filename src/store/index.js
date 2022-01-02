import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/system/user'
import menu from './modules/system/menu'
import permission from './modules/permission'
import role from './modules/system/role'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    menu,
    settings,
    user,
    permission,
    role
  },
  getters
})

export default store
