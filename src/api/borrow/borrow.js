import request from '@/utils/request'

export function borrow (bookId) {
    return request({
        url: '/borrow',
        method: 'post',
        data: { bookId: bookId }
    })
}

export function list ({ current, size, key }) {
    return request({
        url: '/borrow',
        method: 'get',
        params: { current: current, size: size, key: key }
    })
}

export function remand (data) {
    return request({
        url: '/borrow/remand',
        method: 'post',
        data
    })
}