<template>
  <div>
    <app-card
      title="Data Info"
      desc="Infomasi mengenai Aplikasi"
      :class="mobile ? 'q-px-sm q-pb-lg full_height' : 'q-px-lg q-pb-lg'"
    >
      <template #content>
        <div class="row q-col-gutter-sm ">
          <div class="col-sm-5 col-xs-12">
            <app-input
              v-model="setting.info.nama"
              class="q-mb-sm"
              label="Nama"
              outlined
              :loading="setting.loading"
            />
            <app-input
              v-model="setting.info.alamat"
              class="q-mb-sm"
              label="Alamat"
              outlined
              :loading="setting.loading"
            />
            <app-input
              v-model="setting.info.tlp"
              class="q-mb-sm"
              label="Telepon"
              outlined
              :loading="setting.loading"
            />
            <app-input
              v-model="setting.info.kota"
              class="q-mb-sm"
              label="Kota"
              outlined
              :loading="setting.loading"
            />
            <div class="text-right action-right_save">
              <app-btn
                label="Simpan"
                :loading="setting.loading"
                @click="save"
              />
            </div>
          </div>
          <div class="col-sm-7 col-xs-12 text-right">
            <div>
              <q-avatar
                size="180px"
                square
                class="cursor-pointer float-center"
              >
                <q-img
                  :src="setting.info.logo!==null ? storageServer + setting.info.logo : '../../../../src/assets/logos/logo.png'"
                  class="cursor-pointer"
                />
                <!-- <q-file
                  @click="changeImage()"
                  ref="fileRef"
                  v-model="tempImg"
                  filled
                  dense
                  label=" "
                  accept="image/*"
                  @update:model-value="simpanGambar"
                /> -->
              </q-avatar>
              <!-- <q-btn
                round
                color="primary"
                size="xs"
                icon="icon-mat-photo_camera"
                class="float-bottom"
                style="top: 55px; right: 50px; transform: translateY(50%);"
              /> -->
            </div>
          </div>
        </div>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
// import { api, storageServer } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'
import { useAppSettingStore } from 'src/stores/appsetting/appsetting'
// import { ref } from 'vue'
const $q = useQuasar()
const mobile = $q.screen.lt.md
const setting = useAppSettingStore()
const save = () => {
  setting.saveInfo().then(() => {
    notifSuccessVue('Info berhasil disimpan')
  })
}

// const fileRef = ref(null)
// const tempImg = ref(null)
// const imgUrl = ref(setting.logo ? (storageServer + setting.logo) : new URL('../../../../assets/logos/logo.png', import.meta.url).href)
// console.log('imge name', imgUrl)
// watch(() => setting, (apem) => {
//   // console.log('watch apem', apem)
//   if (apem) {
//     imgUrl.value = apem.logo !== null ? (storageServer + apem.logo) : new URL('../../../../assets/logos/logo.png', import.meta.url).href
//   } else {
//     imgUrl.value = new URL('../../../../assets/logos/logo.png', import.meta.url).href
//   }
// })
// function changeImage() {
//   fileRef.value.pickFiles()
// }
// const simpanGambar = () => {
//   // console.log('simpan GaMN', tempImg.value.name)
//   // const form = {
//   //   satu: 'aja',
//   //   id: currentUser.id
//   // }
//   const form = new FormData()
//   form.append('id', 1)
//   form.append('gambar', tempImg.value)
//   setting.loading = true
//   return new Promise((resolve, reject) => {
//     // api.post('v1/user/upload', form)
//     api.post('v1/setting/info/logo', form, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//       .then(resp => {
//         notifSuccess(resp)
//         // console.log('image resp', resp)
//         setting.loading = false
//         setting.getInfoToko()
//         tempImg.value = null
//         resolve(resp)
//       })
//       .catch(err => {
//         setting.loading = false
//         reject(err)
//       })
//   })
// }
</script>
