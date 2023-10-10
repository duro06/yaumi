<template>
  <q-page class="q-pa-lg frame">
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
    <!-- 'animation-name': star.rotation, -->
    <q-card class="my-card">
      <q-card-section>
        anu
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const stars = ref([])
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function makeStar() {
  // console.log(randomNumber(0, 5) % 2)
  stars.value = []
  let starRotation = randomNumber(0, 5) % 2 === 0 ? 'moveRight' : 'moveLeft'
  for (let i = 0; i < 300; i++) {
    starRotation = starRotation === 'moveRight' ? 'moveLeft' : 'moveRight'
    const starTop = randomNumber(0, $q.screen.height)
    const starLeft = randomNumber(0, $q.screen.width)
    const starRadius = randomNumber(2, 4)
    const starDuration = randomNumber(6, 16)

    stars.value.push({
      top: starTop,
      left: starLeft,
      radius: starRadius,
      rotation: starRotation,
      duration: starDuration
    })
  }
}
function cangeCourse() {
  stars.value.forEach(a => {
    // let reverse = ''
    // if (a.rotation === 'moveRight') reverse = 'moveLeft'
    // if (a.rotation === 'moveLeft') reverse = 'moveRight'
    // if (randomNumber(0, 5) % 2 === 0) {
    //   a.rotation = reverse
    //   a.radius = randomNumber(0, 4)
    // }
    // a.rotation = randomNumber(0, 5) % 2 === 0 ? reverse : a.rotation
    a.radius = randomNumber(0, 5) % 2 === 0 ? randomNumber(2, 4) : a.radius
    // a.duration = randomNumber(0, 5) % 2 === 0 ? randomNumber(6, 16) : a.duration
  })
}
makeStar()
setInterval(() => {
  cangeCourse()
}, 500)
</script>
<style lang="scss" scoped>
.frame {
  background-color: #000;
}
.star{
  display: block;
  background-color: #fff;
  position: absolute;
  border-radius: 100%;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: moveRight;
}
.star2{
  display: block;
  background-color: #fff;
  position: absolute;
  border-radius: 100%;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: moveRight;
}

@keyframes moveRight {
    from {
      transform: rotate(0deg) translateX(8px) rotate(0deg);
      opacity: 1;
    }
    to   {
      transform: rotate(360deg) translateX(8px) rotate(-360deg);
      opacity: 0.5;
    }
}

@keyframes moveLeft {
    from {
      transform: rotate(0deg) translateX(8px) rotate(0deg);
      opacity: 1;
    }
    to   {
      transform: rotate(-360deg) translateX(8px) rotate(360deg);
      opacity: 0.5;
    }
}

/* the intro panel */
.intro{color:#63baf7; margin: 1em; font-family: Jura; font-size: 11pt}
.intro h3{font-size: 16pt; margin-bottom: 0}
.intro ul {padding-left: .3em;}
.intro li {list-style-type: none; margin-left: .5em}
.intro .customization-panel{display: flex;flex-wrap: wrap;}
.intro .customization-title{flex-basis : 100%;padding: 10px 0; font-size: 14pt; text-shadow: 0 0 .3em #63baf7; color: #fff;}
.intro .customization-js{margin-right: 2em;}
</style>
