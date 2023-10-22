import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAppSettingStore = defineStore('app_setting', {
  state: () => ({
    loading: false,
    menus: [
      // {
      //   id: 1,
      //   menu: 'Dashboard',
      //   name: 'dashboard',
      //   link: 'dashboard',
      //   icon: 'icon-fa-house-chimney-solid',
      //   submenus: [],
      //   rules: [
      //     {
      //       id: 1,
      //       name: 'root'
      //     },
      //     {
      //       id: 2,
      //       name: 'admin'
      //     },
      //     {
      //       id: 3,
      //       name: 'surveyor'
      //     }
      //   ]
      // },
      // {
      //   id: 2,
      //   menu: 'User',
      //   name: 'user',
      //   link: 'user',
      //   icon: 'icon-mat-person',
      //   submenus: [],
      //   rules: [
      //     {
      //       id: 1,
      //       name: 'root'
      //     },
      //     {
      //       id: 2,
      //       name: 'admin'
      //     }
      //   ]
      // },
      // {
      //   id: 3,
      //   menu: 'Surveyor',
      //   name: 'surveyor',
      //   link: 'surveyor',
      //   icon: 'icon-mat-supervisor_account',
      //   submenus: [],
      //   rules: [
      //     {
      //       id: 1,
      //       name: 'root'
      //     },
      //     {
      //       id: 2,
      //       name: 'admin'
      //     }
      //   ]
      // },
      // {
      //   id: 4,
      //   menu: 'Puskesmas',
      //   name: 'puskesmas',
      //   link: 'puskesmas',
      //   icon: 'icon-mat-group',
      //   submenus: [],
      //   rules: [
      //     {
      //       id: 1,
      //       name: 'root'
      //     },
      //     {
      //       id: 2,
      //       name: 'admin'
      //     }
      //   ]
      // },
      // {
      //   id: 5,
      //   menu: 'Master',
      //   name: 'master',
      //   link: 'master',
      //   icon: 'icon-mat-settings_alert',
      //   submenus: [],
      //   rules: [
      //     {
      //       id: 1,
      //       name: 'root'
      //     },
      //     {
      //       id: 2,
      //       name: 'admin'
      //     }
      //   ]
      // },
      // {
      //   id: 5,
      //   menu: 'master',
      //   name: 'master',
      //   link: 'master',
      //   icon: 'icon-mat-settings_alert',
      //   submenus: [
      //     {
      //       id: 1,
      //       menu: 'bidang survei',
      //       name: 'master.bidangSurvei',
      //       link: 'master/bidangSurvei',
      //       icon: ''
      //     },
      //     {
      //       id: 2,
      //       menu: 'status kepegawaian',
      //       name: 'master.statusKepegawaian',
      //       link: 'master/statusKepegawaian',
      //       icon: ''
      //     },
      //     {
      //       id: 2,
      //       menu: 'profesi',
      //       name: 'master.profesi',
      //       link: 'master/profesi',
      //       icon: ''
      //     }
      //   ],
      //   rules: [
      //     {
      //       id: 1,
      //       name: 'root'
      //     },
      //     {
      //       id: 2,
      //       name: 'admin'
      //     }
      //   ]
      // },
      // {
      //   id: 6,
      //   menu: 'Setting',
      //   name: 'setting',
      //   link: 'setting',
      //   icon: 'icon-mat-settings',
      //   submenus: [
      //     {
      //       id: 1,
      //       menu: 'info',
      //       name: 'setting.info',
      //       link: 'setting/info',
      //       icon: ''
      //     },
      //     {
      //       id: 2,
      //       menu: 'themes',
      //       name: 'setting.themes',
      //       link: 'setting/themes',
      //       icon: ''
      //     }
      //   ],
      //   rules: [
      //     {
      //       id: 1,
      //       name: 'root'
      //     },
      //     {
      //       id: 2,
      //       name: 'admin'
      //     }
      //   ]
      // }
    ],
    form: { menu: 'yaumi' },
    info: {
      logo: null
    },
    themes: []
  }),
  actions: {
    setInfo(key, val) {
      this.info[key] = val
    },
    setTheme(key, val) {
      this.themes[key].value = val
      this.saveSetting()
    },
    // api related function
    getInitialData() {
      this.getInfoToko()
      this.getMenus()
    },
    getLogo() {
      return new Promise(resolve => {
        api.get('v1/setting/logo')
          .then(resp => {
            this.info.logo = resp.data.logo ?? null
            resolve(resp)
          })
      })
    },
    getMenus() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/setting/menu/index')
          .then((resp) => {
            console.log('menus', resp.data)
            this.loading = false
            this.menus = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getInfoToko() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/setting/info/info-toko')
          .then((resp) => {
            console.log('info toko', resp.data)
            this.loading = false
            this.info = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },

    saveInfo() {
      const form = this.info
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/setting/info/store', form)
          .then((resp) => {
            this.loading = false
            this.getInfoToko()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
