import { getRoleList, getById, saveOrupdate, saveOrUpdateMenuByRoleId } from "@/api/system/role"


const getDefaultState = () => {
    return {
        roles: []
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    list ({ }, { page, size, key }) {
        return new Promise((resolve) => {
            getRoleList(page, size, key).then(resp => {
                resolve(resp)
            })
        })
    },

    getById ({ }, id) {
        return new Promise((resolve) => {
            getById(id).then(resp => {
                resolve(resp)
            })
        })
    },

    saveOrUpdate ({ }, data) {
        return new Promise((resolve) => {
            saveOrupdate(data).then(resp => {
                resolve(resp)
            })
        })
    },

    saveOrUpdateMenuByRoleId ({ }, { roleId, menuIds }) {
        return new Promise((resolve) => {
            saveOrUpdateMenuByRoleId(roleId, menuIds).then(resp => {
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