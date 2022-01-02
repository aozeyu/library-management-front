import { login, logout, getInfo, getUserList, delByIds, getById, saveOrUpdate } from '@/api/system/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    nickName: '',
    avatar: '',
    permissions: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, nickName) => {
    state.nickName = nickName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { nickName, avatar, permissions } = data

        commit('SET_NAME', nickName)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSIONS', permissions)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  getUserList ({ }, { current, size, key }) {
    return new Promise(resolve => {
      getUserList(current, size, key).then((data) => {
        resolve(data)
      })
    })
  },

  delByIds ({ }, ids) {
    return new Promise(resolve => {
      delByIds(ids).then((resp) => {
        resolve(resp)
      })
    })
  },

  getById ({ }, id) {
    return new Promise(resolve => {
      getById(id).then((resp) => {
        resolve(resp)
      })
    })
  },

  saveOrUpdate ({ }, data) {
    return new Promise(resolve => {
      saveOrUpdate(data).then((resp) => {
        resolve(resp)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

