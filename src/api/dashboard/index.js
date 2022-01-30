import request from '@/utils/request'

export default function getNum () {
    return request({
      url: '/dashboard/getNum',
      method: 'get'
    })
  }