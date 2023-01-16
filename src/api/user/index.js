import { defAxios as request } from '@/utils/http'

export function getUsers(params = {}) {
  return request({
    url: '/users',
    method: 'get',
    params,
  })
}

export function getUser(id) {
  if (id) {
    return request({
      url: `/user/${id}`,
      method: 'get',
    })
  }
  return request({
    url: '/user',
    method: 'get',
  })
}

export function saveUser(data = {}, id) {
  if (id) {
    return request({
      url: '/user',
      method: 'put',
      data,
    })
  }

  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  })
}

export const getDataList = (data) => {
  return request({
    url: '/business/jyzlzt/search',
    method: 'post',
    data,
  })
}

