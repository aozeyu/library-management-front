import request from '@/utils/request'

export function renew (borrowId) {
    return request({
        url: '/renewBorrow',
        method: 'post',
        data: { borrowId: borrowId }
    })
}

export function list ({ current, size, key }) {
    return request({
        url: '/renewBorrow',
        method: 'get',
        params: { current: current, size: size, key: key }
    })
}

export function approval (data) {
    return request({
        url: '/renewBorrow/approval',
        method: 'post',
        data
    })
}