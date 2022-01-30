import request from '@/utils/request'
import getIds from '@/utils/idUtil'

export function list ({ current, size, key }) {
    return request({
        url: '/bookCategory',
        method: 'get',
        params: { current: current, size: size, categoryName: key }
    })
}

export function delByIds (ids) {
    return request({
        url: '/bookCategory?idList=' + getIds(ids),
        method: 'delete'
    })
}

export function saveOrUpdate (data) {
    return request({
        url: '/bookCategory',
        method: data.method,
        data
    })
}

export function getById (id) {
    return request({
        url: '/bookCategory/' + id,
        method: 'get'
    })
}