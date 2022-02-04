import request from '@/utils/request'

export function hotBook () {
    return request({
        url: '/book/hotBook',
        method: 'get'
    })
}

export function hotCategory () {
    return request({
        url: '/bookCategory/hotCategory',
        method: 'get'
    })
}