import request from '@/utils/request'
import getIds from '@/utils/idUtil'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/user/infoByToken',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserList (page, size, nickName) {
  return request({
    url: '/user',
    method: 'get',
    params: { current: page, size: size, nickName: nickName }
  })
}

export function delByIds (ids) {
  return request({
    url: '/user?idList=' + getIds(ids),
    method: 'delete'
  })
}

export function getById (id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/user',
    method: data.method,
    data
  })
}