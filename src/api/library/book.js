import request from '@/utils/request'
import getIds from '@/utils/idUtil'

export function list ({ current, size, key, categoryId }) {
    return request({
        url: '/book',
        method: 'get',
        params: { current: current, size: size, bookName: key, bookCategoryId: categoryId }
    })
}

export function delByIds (ids) {
    return request({
        url: '/book?idList=' + getIds(ids),
        method: 'delete'
    })
}

export function saveOrUpdate (data) {
    return request({
        url: '/book',
        method: data.method,
        data
    })
}

export function getById (id) {
    return request({
        url: '/book/' + id,
        method: 'get'
    })
}