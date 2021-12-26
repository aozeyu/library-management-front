import request from '@/utils/request'

export function buildMenu () {
  return request({
    url: '/menu/buildMenu',
    method: 'get'
  })
}

export function buildTree (key) {
  return request({
    url: '/menu/buildTree',
    method: 'get',
    params: { name: key }
  })
}

export function getChildren (pid) {
  return request({
    url: '/menu/getChildren',
    method: 'get',
    params: { pid: pid }
  })
}
