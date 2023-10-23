<template>
  <q-page class="flex column flex-center bg-dark frame">
    <!-- <q-page class=" bg-dark"> -->
    <!-- <div class="frame"> -->
    <div
      v-for="(star, index) in stars"
      :key="index"
      :class="star.rotation==='moveRight'?'star':'star2'"
      :style="{
        'top': star.top + 'px',
        'left': star.left + 'px',
        'width': star.radius + 'px',
        'height': star.radius + 'px',
        'animation-duration': star.duration + 's',
      }"
    />
    <BgAnimation class="z--" />

    <q-card
      flat
      bordered
      class="card-login"
    >
      <q-card-section>
        <div
          class="text-center"
          style="margin-top:30px"
        >
          <q-avatar
            square
            size="140px"
          >
            <img :src=" setting.info.logo !== null ? storageServer + setting.info.logo : '../src/assets/logos/logo.png'">
          </q-avatar>
          <div
            style="margin-top:-40px"
            class="text-h6 text-white"
          >
            Halaman Login
          </div>
          <div class="text-white">
            Silahkan Anda Login Terlebih Dahulu
          </div>
        </div>
        <q-form
          ref="myForm"
          class="q-pa-md"
          style="margin-top:70px"
          @submit="onSubmit"
        >
          <app-input
            v-model="form.email"
            dense
            label="email"
            validator="email"
            icon="icon-mat-email"
          />
          <app-input
            v-model="form.password"
            dense
            type="password"
            label="password"
            icon="icon-mat-key"
            class="q-mt-sm"
          />

          <div style="margin-top:50px">
            <app-btn
              type="submit"
              :loading="storeAuth.loading"
              class="full-width"
              label="Login"
            />
          </div>
        </q-form>
      </q-card-section>
      <div class="float-bottom q-px-md text-grey-6">
        <q-separator />
        <div class="">
          Aplikasi TOKO ini
          tidak di perjualbelikan secara bebas tanpa seizin dari pembuatnya.
        </div>
        <div class="q-mt-lg q-pb-xs text-right f-14">
          TOKO Versi BETA
        </div>
      </div>
    </q-card>
    <!-- </div> -->
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { storageServer } from 'src/boot/axios'
import { useAppSettingStore } from 'src/stores/appsetting/appsetting'
import BgAnimation from './BgAnimation.vue'
const setting = useAppSettingStore()
setting.getLogo()
const storeAuth = useAuthStore()
const $q = useQuasar()

const myForm = ref(null)
const form = ref({
  email: '',
  password: '',
  device_name: $q.platform.is.name + '-' + $q.platform.is.platform
})

function onSubmit () {
  storeAuth.login(form.value)
}

// stars
const stars = ref([])
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function makeStar() {
  // console.log(randomNumber(0, 5) % 2)
  stars.value = []
  let starRotation = randomNumber(0, 5) % 2 === 0 ? 'moveRight' : 'moveLeft'
  for (let i = 0; i < 350; i++) {
    starRotation = starRotation === 'moveRight' ? 'moveLeft' : 'moveRight'
    const starTop = randomNumber(0, $q.screen.height)
    const starLeft = randomNumber(0, $q.screen.width)
    const starRadius = randomNumber(2, 4)
    const starDuration = randomNumber(10, 300)

    stars.value.push({
      top: starTop,
      left: starLeft,
      radius: starRadius,
      rotation: starRotation,
      duration: starDuration
    })
  }
}
// function cangeCourse() {
//   stars.value.forEach(a => {
//     a.radius = randomNumber(0, 5) % 2 === 0 ? randomNumber(2, 4) : a.radius
//   })
// }
// setInterval(() => {
//   cangeCourse()
// }, 500)
makeStar()
// -------

</script>

<style lang="scss" scoped>
.card-login {
  width:360px;
  min-height:600px;
  overflow: hidden;
  position: relative;
    &::before {
      content: "";
      width:360px;
      height:230px;
      position: absolute;
      border-radius: 0 0 50% 50%;
      background: linear-gradient(-45deg, $green-10, $deep-purple-10);
      overflow: hidden;
    }
}

.frame{
  width: 100vw;
  height:100vh;
  overflow: hidden;
}
@media(max-width:800px){
    .card-login {
        width: 100vw;
        height:100vh;
        border-radius: 0px;
          &::before {
            width: 100vw;
          }
          z-index: 2;
    }
}

// kunang2
.star{
  display: block;
  background-color: #fdd10e;
  position: absolute;
  border-radius: 100%;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: moveRight;
  overflow: hidden;
}
.star2{
  display: block;
  background-color: #fdd10e;
  position: absolute;
  border-radius: 100%;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: moveRight;
  overflow: hidden;
}

@keyframes moveRight {
    from {
      transform: rotate(0deg) translateX(800px) rotate(0deg);
      opacity: 1;
      overflow: hidden;
    }
    to   {
      transform: rotate(360deg) translateX(800px) rotate(-360deg);
      opacity: 0.5;
      overflow: hidden;
    }

}

@keyframes moveLeft {
    from {
      transform: rotate(0deg) translateX(800px) rotate(0deg);
      opacity: 1;
      overflow: hidden;
    }
    to   {
      transform: rotate(-360deg) translateX(800px) rotate(360deg);
      opacity: 0.5;
      overflow: hidden;
    }
}
.top-page {
  position: relative;
  text-align: center;
  background: linear-gradient(60deg, $secondary 0%, $primary 100%);

  .inner-top-page {
      width: 100%;
      height:100vh;
      margin:0;
      padding: 0;
    }

}
.z-- {
  z-index: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 15vh;
}
</style>
