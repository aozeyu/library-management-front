import request from '@/utils/request'

export function mylist ({ current, size, key }) {
    return request({
        url: '/borrow/my',
        method: 'get',
        params: { current: current, size: size, key: key }
    })
}