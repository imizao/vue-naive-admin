import axios from 'axios'
import { repReject, repResolve, reqReject, reqResolve } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    // baseURL: 'http://datacenter.whdev.vpclub.cn',
    baseURL: 'http://10.10.56.18:30095', // 正式
    timeout: 12000,
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(repResolve, repReject)
  return service
}

export const defAxios = createAxios()

export const testAxios = createAxios({
  baseURL: import.meta.env.VITE_APP_BASE_API_TEST,
})
