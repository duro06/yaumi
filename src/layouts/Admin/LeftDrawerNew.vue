<template>
  <q-drawer
    show-if-above
    side="left"
    bordered
    class="bg-primary"
    :width="220"
  >
    <!-- logo -->
    <div class="absolute-top">
      <div
        class="flex flex-center"
        :class="dark?'bg-dark':'bg-white'"
        style="height: 60px"
      >
        <q-avatar
          style="margin-top:-40px;"
          square
          size="140px"
        >
          <img :src=" setting.info.logo!==null ? storageServer + setting.info.logo : '../src/assets/logos/logo.png'">
        </q-avatar>
      </div>
    </div>

    <q-scroll-area
      class="fit"
      style="height:calc(100%-60px); padding-top:60px;"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <q-list
        v-if="menus.length"
        :class="dark?'bg-dark q-mb-xl':'bg-white text-dark q-mb-xl'"
        bordered
        separator
      >
        <!-- INI JIKA TIDAK PUNYA SUBMENU -->
        <template
          v-for="(menu, i) in menus"
          :key="i"
        >
          <q-item
            v-if="menu?.submenus.length === 0"
            v-ripple
            no-padding
            clickable
            bordered
            class="sidebar"
            :to="`/${menu.url}`"
            :active-class="props.dark ? 'active-dark text-white' : 'active text-primary'"
            :active="aktif(path) === menu.url"
          >
            <q-item-section avatar>
              <!-- <q-icon
                :name="menu.icon"
                size="25px"
              /> -->
              <q-avatar
                size="32px"
                :icon="menu.icon"
                :color="route.matched[1].path === aturLink(menu.url)?'grey-4':'primary'"
                :text-color="route.matched[1].path === aturLink(menu.url)?'primary':'white'"
                font-size="20px"
              />
            </q-item-section>
            <q-item-section>{{ menu.menu }}</q-item-section>
          </q-item>
          <q-expansion-item
            v-else
            no-padding
            bordered
            separator
            class="sidebar"
            :value="route.matched[1].path === aturLink(menu.url)"
            :expand-icon-class="route.matched[1].path === aturLink(menu.url)?'bd-left text-primary':'bg-primary text-white'"
            :default-opened="route.matched[1].path === aturLink(menu.url)"
            :header-class="route.matched[1].path === aturLink(menu.url)?'bd-left bg-grey-4 text-primary':'bg-primary text-white'"
          >
            <template #header>
              <q-item-section avatar>
                <q-avatar
                  size="32px"
                  :icon="menu.icon"
                  :color="route.matched[1].path === aturLink(menu.url)?'grey-4':'primary'"
                  :text-color="route.matched[1].path === aturLink(menu.url)?'primary':'white'"
                  font-size="20px"
                />
              </q-item-section>
              <q-item-section>
                {{ menu.menu }}
              </q-item-section>
            </template>
            <q-list
              bordered
              separator
              :class="dark?'bg-dark':'bg-white text-white'"
            >
              <template
                v-for="(sub, x) in menu.submenus"
                :key="x"
              >
                <q-item
                  v-ripple
                  clickable
                  :active-class="props.dark ? 'active-dark text-white' : 'active-sub text-primary'"
                  :to="`${aturLink(sub.url)}`"
                  class="q-pl-xl sub-sidebar"
                >
                  <!-- :active="link === 'inbox'" -->
                  <q-item-section avatar>
                    <q-icon
                      :name="route.path.indexOf(aturLink(sub.url)) > -1?'icon-mat-check_circle':'icon-mat-lens'"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    {{ sub.menu }}
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-expansion-item>
        </template>
      </q-list>
      <app-card
        v-if="!menus.length"
        :is-header="false"
      >
        <template #content>
          <app-no-data text="Belum ada Menu" />
        </template>
      </app-card>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
// import { useAuthStore } from 'src/stores/auth'
import { storageServer } from 'src/boot/axios'
import { useAppSettingStore } from 'src/stores/appsetting/appsetting'

const setting = useAppSettingStore()
const route = useRoute()
const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  menus: {
    type: Array,
    default: () => []
  }
})

// const store = useAuthStore()
// const role = computed(() => {
//   return store.user ? store.user.role : ''
// })

// const filterMenu = computed(() => {
//   const arr = props.menus
//   const a = arr.filter(function (item) {
//     return item.rules
//       ? item.rules.some(function (group) {
//         return group.name === role.value
//       })
//       : null
//   })
//   return a
// })

const path = computed(() => useRoute().name)

const aktif = (apem) => {
  const temp = apem.split('/')
  return temp[0]
}

const thumbStyle = ref({
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '2px',
  opacity: 0.75
})
const barStyle = ref({
  right: '0px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.2
})

function aturLink(val) {
  const firstTxt = val.charAt(0)
  if (firstTxt !== '/') {
    return `/${val}`
  }
  return val
}
console.log('router', props.dark)
</script>

<style lang="scss" scoped>
// .sidebar {
//   // max-width: 220px;
//   // width: calc(100% - 10px);
//   // height: 60px;
// }

.submenu {
  // width: calc(100% - 10px);
  height: 30px;
  text-decoration: none;
  color: $grey-5;
}

a.sidebar {
  text-decoration: none;
  color: white;
  background-color: $primary;

}
a.sub-sidebar {
  text-decoration: none;
  color: white;
  background-color: $green-10;

}
.bd-left{
  border-radius: 10px 0px 0px 10px;
  border-left: 3px solid $primary;
  color: $primary;
  background-color: $grey-4;
}
a.router-link-active,
a.router-link-exact-active,
a.active {
  // margin-left: 10px;
  // border-radius: 10px 0px 0px 10px;
  // border-left: 3px solid $primary;
  color: $primary;
  background-color: $grey-4;
}
a.active-sub {
  // margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  border-left: 3px solid $primary;
  color: $primary;
  background-color: $lime-11;
}
a.router-link-active-dark,
a.router-link-exact-active-dark,
a.active-dark {
  // margin-left: 10px;
  // border-radius: 10px 0px 0px 10px;
  // border-left: 3px solid white;
  background-color: $dark-page;
}

.just-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>
