<template>
  <q-header
    :bordered="!mobile"
    reveal
    :class="dark?'bg-dark':'bg-white text-dark'"
  >
    <div
      class="q-px-sm q-py-sm flex items-center justify-between"
      style="height:60px"
    >
      <!-- LEFT -->
      <div>
        <!-- <q-btn
          v-if="!mobile"
          flat
          round
          icon="icon-mat-segment"
          class="flip__icon"
          @click="emit('toggleLeft')"
        /> -->
        <div v-if="mobile">
          <q-btn
            v-if="menu"
            flat
            dense
            icon="icon-mat-menu"
          >
            <q-menu

              ref="refMenu"
              anchor="bottom right"
              self="top left"
              transition-show="slide-down"
              transition-hide="slide-right"
              :offset="[0,15]"
            >
              <q-card
                v-if="menu.submenus.length"
                style="width:200px"
              >
                <q-card-section>
                  <div class="text-weight-bold f-12">
                    <q-item
                      class="submenu"
                      :to="`/${menu.link}`"
                    >
                      <q-item-section>{{ menu.nama }}</q-item-section>
                    </q-item>
                  </div>
                  <div class="q-my-sm">
                    <q-separator />
                  </div>

                  <div
                    v-for="(submenu,n) in menu.submenus"
                    :key="n"
                  >
                    <div v-if="submenu.link">
                      <q-item
                        ref="refSubItem"
                        :to="`/${submenu.link}`"
                        replace
                        class="submenu flex flex-center item item-link"
                        :active-class="dark? 'active-dark text-secondary' : 'active text-primary'"
                        :active="path===submenu.name"
                        exact
                      >
                        <!-- {{ aktif(menu.name) }} : {{ path }} -->
                        <q-item-section
                          v-if="submenu.icon"
                          avatar
                        >
                          <q-icon
                            :name="submenu.icon"
                            size="25px"
                          />
                        </q-item-section>
                        <q-item-section>{{ submenu.nama }}</q-item-section>
                      </q-item>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <q-card v-if="!menu.submenus.length">
                <q-card-section>
                  <div class="text-weight-bold f-12">
                    <q-item
                      :to="`/${menu.link}`"
                    >
                      <q-item-section>{{ menu.nama }}</q-item-section>
                    </q-item>
                  </div>
                </q-card-section>
              </q-card>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <!-- RIGHT -->
      <div :class="!mobile?'q-pr-md':'q-pr-sm'">
        <q-btn
          flat
          round
          icon="icon-eva-bell-outline"
        />
        <q-avatar
          size="40px"
          class="q-ml-sm cursor-pointer bg-grey"
        >
          <img :src="image">
          <adm-header-menu-profile />
        </q-avatar>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import { useAppSettingStore } from 'src/stores/appsetting/appsetting'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { storageServer } from 'src/boot/axios'
import AdmHeaderMenuProfile from './AdmHeaderMenuProfile.vue'

const store = useAuthStore()
// const emit = defineEmits(['toggleLeft'])
defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Boolean,
    default: false
  }
})
const setting = useAppSettingStore()
const path = computed(() => useRoute().name)
const menu = computed(() => {
  const temp = path.value.split('.')
  const menus = setting.menus.filter(data => {
    return data.name === temp[0]
  })
  if (menus.length) return menus[0]
  else return false
})

const image = computed(() => {
  let imgUrl = new URL('../../assets/images/actor.svg', import.meta.url).href
  if (store.user) {
    if (store.user.photo) {
      imgUrl = storageServer + store.user.photo
    } else {
      imgUrl = new URL('../../assets/images/actor.svg', import.meta.url).href
    }
  }
  return imgUrl
})

</script>

<style lang="scss" scoped>
.flip__icon {
  transform: scaleX(-1);
}
.submenu {
  width: calc(100% - 10px);
  height: 30px;
  text-decoration: none;
  color:$grey-5;
}
.active {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
    background-color: $grey-4;
  }
  .active-dark {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid white;
    background-color: $dark-page;
  }
</style>
