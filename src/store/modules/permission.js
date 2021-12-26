import { constantRoutes } from '@/router'
import { buildMenu } from '@/api/system/menu'
import Layout from '@/layout/index'

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  DEL_ROUTES: (state) => {
    state.routes = []
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      buildMenu().then(res => {
        const accessedRoutes = filterAsyncRouter(res.data)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  },

  delRoutes({ commit }) {
    commit('DEL_ROUTES')
  }
}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    } else {
      delete router['children']
      delete router['redirect']
    }
    return true
  })
}

export const loadView = (view) => {
  return (resolve) => require([`@/views${view}`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
