import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAppSettingStore = defineStore('app_setting', {
  state: () => ({
    loading: false,
    menus: [
      {
        id: 1,
        nama: 'Dashboard',
        name: 'dashboard',
        link: 'dashboard',
        icon: 'icon-mat-dashboard',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'root'
          },
          {
            id: 2,
            name: 'admin'
          },
          {
            id: 3,
            name: 'surveyor'
          }
        ]
      },
      {
        id: 2,
        nama: 'User',
        name: 'user',
        link: 'user',
        icon: 'icon-mat-person',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'root'
          },
          {
            id: 2,
            name: 'admin'
          }
        ]
      },
      {
        id: 3,
        nama: 'Surveyor',
        name: 'surveyor',
        link: 'surveyor',
        icon: 'icon-mat-supervisor_account',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'root'
          },
          {
            id: 2,
            name: 'admin'
          }
        ]
      },
      {
        id: 4,
        nama: 'Puskesmas',
        name: 'puskesmas',
        link: 'puskesmas',
        icon: 'icon-mat-group',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'root'
          },
          {
            id: 2,
            name: 'admin'
          }
        ]
      },
      {
        id: 5,
        nama: 'Master',
        name: 'master',
        link: 'master',
        icon: 'icon-mat-settings_alert',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'root'
          },
          {
            id: 2,
            name: 'admin'
          }
        ]
      },
      // {
      //   id: 5,
      //   nama: 'master',
      //   name: 'master',
      //   link: 'master',
      //   icon: 'icon-mat-settings_alert',
      //   submenus: [
      //     {
      //       id: 1,
      //       nama: 'bidang survei',
      //       name: 'master.bidangSurvei',
      //       link: 'master/bidangSurvei',
      //       icon: ''
      //     },
      //     {
      //       id: 2,
      //       nama: 'status kepegawaian',
      //       name: 'master.statusKepegawaian',
      //       link: 'master/statusKepegawaian',
      //       icon: ''
      //     },
      //     {
      //       id: 2,
      //       nama: 'profesi',
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
      {
        id: 6,
        nama: 'Setting',
        name: 'setting',
        link: 'setting',
        icon: 'icon-mat-settings',
        submenus: [
          {
            id: 1,
            nama: 'info',
            name: 'setting.info',
            link: 'setting/info',
            icon: ''
          },
          {
            id: 2,
            nama: 'themes',
            name: 'setting.themes',
            link: 'setting/themes',
            icon: ''
          }
        ],
        rules: [
          {
            id: 1,
            name: 'root'
          },
          {
            id: 2,
            name: 'admin'
          }
        ]
      }
    ],
    form: { nama: 'yaumi' },
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
      // this.form.menus = this.menus
      const form = this.info
      // this.form.levels = this.levels
      // this.form.themes = this.themes
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/setting/info/store', form)
          .then((resp) => {
            this.loading = false
            // console.log('simpan', resp)
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
