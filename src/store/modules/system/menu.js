import { buildMenu, buildTree, getChildren } from '@/api/system/menu'

const getDefaultState = () => {
  return {
    menus: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  buildMenu ({ commit }) {
    return new Promise((resolve, reject) => {
      buildMenu().then(response => {
        const { data } = response
        commit('SET_MENUS', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  buildTree ({ }, { key }) {
    return new Promise((resolve) => {
      buildTree(key).then(resp => {
        resolve(resp)
      })
    })
  },

  getChildren ({ }, pid) {
    return new Promise((resolve) => {
      getChildren(pid).then(resp => {
        resolve(resp)
      })
    })
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
