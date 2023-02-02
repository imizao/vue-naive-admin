import { defineStore } from 'pinia'
import { getUser } from '@/api/user'
import { removeToken } from '@/utils/token'
import { toLogin } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
      isAccounts: false,
      accountsId: '',
      homeEditDataObj: {}
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
    // isAccounts() {
    //   return this.isAccounts
    // },
  },
  actions: {
    async getUserInfo() {
      try {
        // const res = await getUser()
        const res = {
          code: 0,
          data: {
            id: 1,
            name: '陈洁',
            avatar: 'https://assets.qszone.com/images/avatar.jpg',
            email: 'Ronnie@123.com',
            role: ['admin'],
          }
        }
        if (res.code === 0) {
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role }
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      removeToken()
      this.userInfo = {}
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
    setIsAccounts(bool) {
      this.isAccounts = bool
    },
    setAccountsId(id) {
      this.accountsId = id
    },
    setHomeEditDataObj(obj) {
      this.homeEditDataObj = {
        ...this.homeEditDataObj,
        ...obj
      }
    }
  },
})
