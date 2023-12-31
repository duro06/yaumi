import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import * as storage from 'src/modules/storage'
import { routerInstance } from 'src/boot/router'
import { waitLoad } from 'src/modules/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({

    token: localStorage.getItem('token') ? storage.getLocalToken() : null,
    user: localStorage.getItem('user') ? storage.getUser() : null,
    loading: false,
    role: '',
    status: '',
    statusSurveyor: ''
  }),
  getters: {
    isAuth (state) {
      return state.token !== null || state.token !== undefined
    },
    getToken: () => storage.getLocalToken(),
    userGetter: () => storage.getUser() !== null || storage.getUser() !== undefined
  },
  actions: {
    async login (payload) {
      this.loading = true
      waitLoad('show')
      try {
        await api.post('/v1/login', payload).then(resp => {
          console.log('login', resp)
          storage.setLocalToken(resp.data.token)
          storage.setUser(resp.data.user)
          const hdd = storage.getLocalToken()
          const hddUser = storage.getUser()
          if (hdd) {
            this.SET_TOKEN_USER(hdd, hddUser)
          }
          this.loading = false
          waitLoad('done')
        })
      } catch (error) {
        waitLoad('done')
        this.loading = false
        // console.log('err login', error.response)
        // notifErr(error.response)
      }
    },
    SET_TOKEN_USER (token, user) {
      storage.setHeaderToken(token)
      this.token = token
      this.user = user
      this.loading = false
      routerInstance.push('/')
    },
    SET_TOKEN_USER_PRA(token, user) {
      storage.setHeaderToken(token)
      this.token = token
      this.user = user
      routerInstance.push('/veriregister')
    },
    REMOVE_LOKAL () {
      storage.clearStore()
      this.user = null
      this.token = ''
    },
    async getUser () {
      await api.get('/v1/profile').then(resp => {
        console.log('me', resp.data.data)
        if (resp.status === 200) {
          storage.setUser(resp.data.data)
          this.user = resp.data.data
        }
      })
    },

    async logout () {
      waitLoad('show')
      try {
        await api.post('/v1/logout').then(resp => {
          this.REMOVE_LOKAL()
          routerInstance.replace('/login')
          waitLoad('done')
        })
      } catch (error) {
        console.log(error)
        waitLoad('done')
      }
    }
  }
})
