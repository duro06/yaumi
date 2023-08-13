import { Notify, Loading, QSpinnerCube } from 'quasar'
import { routerInstance } from 'boot/router'
import * as storage from 'src/modules/storage'

const removeToken = () => {
  storage.clearStore()
  // storage.deleteLocalToken()
  // storage.deleteHeaderToken()
  // storage.deleteUser()
  routerInstance.replace('/login')
}

const hapusToken = () => {
  storage.deleteLocalToken()
  storage.deleteHeaderToken()
}
const insertToken = (token) => {
  storage.setLocalToken(token)
  storage.setHeaderToken(token)
}

const noftifResp = (resp) => {
  localStorage.setItem('attempt', 1)
  // console.log('aq ga error', resp)
  // if (resp.status === 202) {
  //   storage.setLocalToken(resp.data.token)
  // }
}

const notifErr = (resp, next) => {
  // const msg = resp ? resp.data.message : 'Ada Kesalahan, Harap ulangi!'
  const status = resp ? resp.status : 500

  // unauthenticated
  console.log('utility', resp)
  if (resp.status === 401 && resp.statusText === 'Unauthorized') {
    return removeToken()
  }

  //   if (status === 200) {
  if (status === 402) {
    hapusToken()
    console.log('anyar mas', resp)
    insertToken(resp.data.token)
    // return next()resp.status
    if (resp.config.url !== '/v1/auth/profile') {
      Notify.create({
        message: 'ada kesalahan, harap ulangi',
        icon: 'icon-eva-message_circle_outline',
        position: 'bottom-right',
        color: 'negative',
        actions: [
          {
            label: 'Dismiss',
            color: 'yellow',
            handler: () => {
              /* console.log('wooow') */
            }
          }
        ]
      })
    };
  } else if (status === 422) {
    // const msgs = resp.data.message
    const keys = Object.keys(resp.data)
    keys.forEach(msgkeys => {
      if (msgkeys === 'errors') {
        const key = Object.keys(resp.data[msgkeys])
        // console.log('key', key)
        key.forEach(msgkey => {
          resp.data[msgkeys][msgkey].forEach(data => {
            Notify.create({
              message: data,
              icon: 'icon-eva-message-circle-outline',
              position: 'top-right',
              color: 'negative',
              actions: [
                { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
              ]
              // for (const key in msgs) {
              // }
            })
          })
        })
      } else {
        if (msgkeys !== 'nomor') {
          Notify.create({
            message: resp.data[msgkeys],
            icon: 'icon-eva-message-circle-outline',
            position: 'top-right',
            color: 'negative',
            actions: [
              { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
            ]
          // for (const key in msgs) {
          // }
          })
        }
      }
    })
  } else if (status === 409) {
    const msgs = resp.data.message
    Notify.create({
      message: msgs,
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  } else if (status === 500 || status === 410) {
    let msgs = 'Ada Kesalahan Harap ulangi'
    if (resp.data) {
      msgs = resp.data.message ? resp.data.message : 'Ada Kesalahan Harap ulangi'
    }
    Notify.create({
      message: msgs,
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  } else {
    const msgs = resp.data ? resp.data.message : 'NETWORk ERROR SERVER TIDAK MERESPON'
    Notify.create({
      message: msgs,
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  }
}

const notifSuccess = (resp) => {
  const msg = resp ? resp.data.message : 'Sucees!, Wow Kerja Bagus!'
  Notify.create({
    message: msg || 'Sucees!, Wow Kerja Bagus!',
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    color: 'positive',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifSuccessVue = (msa) => {
  Notify.create({
    message: msa || 'Sucees!',
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    color: 'positive',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifErrVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message_circle_outline',
    position: 'bottom-right',
    color: 'negative',
    actions: [
      { label: 'Dismiss', color: 'warning', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}

const waitLoad = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: 'Harap bersabar. Menunggu...',
      boxClass: 'bg-dark text-white',
      spinner: QSpinnerCube,
      // spinnerColor: 'yellow',
      spinnerSize: 30
    })
  } else {
    Loading.hide()
  }
}

export {
  notifSuccess,
  notifErr,
  notifErrVue,
  waitLoad,
  noftifResp,
  notifSuccessVue
}
