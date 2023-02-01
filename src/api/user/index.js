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
export const saveDataList = (data) => {
  return request({
    url: '/business/jyzlzt/jyzlAddUpdate',
    method: 'post',
    data,
  })
}
export const saveDraft = (data) => {
  return request({
    url: '/business/jyzlzt/saveDraft',
    method: 'post',
    data,
  })
}
export const saveCockpit = (data) => {
  return request({
    url: '/business/jyzlzt/saveCockpit',
    method: 'post',
    data,
  })
}
export const manageRecordPage = (data) => {
  return request({
    url: '/business/special_inquiry/manage_record_page',
    method: 'post',
    data,
  })
}
export const processRecordList = (data) => {
  return request({
    url: '/business/special_inquiry/process_record_list',
    method: 'post',
    data,
  })
}
// 流程驳回(状态)操作
export const processRecordUpdateBh = (data) => {
  return request({
    url: '/business/special_inquiry/process_record_update_bh',
    method: 'post',
    data,
  })
}
// 流程通过(状态)操作
export const processRecordUpdateTg = (data) => {
  return request({
    url: '/business/special_inquiry/process_record_update_tg',
    method: 'post',
    data,
  })
}
// 流程关闭(状态)操作
export const processRecordUpdateGb = (data) => {
  return request({
    url: '/business/special_inquiry/process_record_update_gb',
    method: 'post',
    data,
  })
}
// 根据id查看管理记录
export const searchBusiness = (data) => {
  return request({
    url: '/business/jyzlzt/searchBusiness',
    method: 'post',
    data,
  })
}
// 获取用户权限
export const permissions = (data) => {
  return request({
    url: '/sys/menu/permissions',
    method: 'post',
    data,
  })
}

