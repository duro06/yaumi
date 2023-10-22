
const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: '/dashboard', name: 'dashboard', component: () => import('pages/IndexPage.vue') },
      { path: '/puskesmas', name: 'puskesmas', component: () => import('pages/v1/puskesmas/IndexPage.vue') },
      { path: '/user', name: 'user', component: () => import('pages/v1/user/IndexPage.vue') },
      {
        path: '/file',
        name: 'file',
        component: () => import('pages/v1/file/IndexPage.vue'),
        children: [
          { path: '/file', redirect: '/file/users' },
          { path: '/file/users', name: 'file.users', component: () => import('pages/v1/file/users/IndexPage.vue') },
          { path: '/file/backup', name: 'file.backup', component: () => import('pages/v1/file/backup/IndexPage.vue') },
          { path: '/file/restore', name: 'file.restore', component: () => import('pages/v1/file/restore/IndexPage.vue') }
        ]
      },
      {
        path: '/master',
        name: 'master',
        component: () => import('pages/v1/master/IndexPage.vue'),
        children: [
          { path: '/master', redirect: '/master/item_barang' },
          { path: '/master/item_barang', name: 'master.item_barang', component: () => import('pages/v1/master/item_barang/IndexPage.vue') },
          { path: '/master/supplier', name: 'master.supplier', component: () => import('pages/v1/master/supplier/IndexPage.vue') },
          { path: '/master/stok_toko', name: 'master.stok_toko', component: () => import('pages/v1/master/stok_toko/IndexPage.vue') },
          { path: '/master/stok_gudang', name: 'master.stok_gudang', component: () => import('pages/v1/master/stok_gudang/IndexPage.vue') }

        ]
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/v1/setting/IndexPage.vue'),
        children: [
          { path: '/settings', redirect: '/settings/app' },
          { path: '/settings/sidemenu', name: 'settings.sidemenu', component: () => import('pages/v1/setting/sidemenu/IndexPage.vue') },
          { path: '/settings/app', name: 'settings.app', component: () => import('pages/v1/setting/info/IndexPage.vue') },
          { path: '/settings/level', name: 'settings.level', component: () => import('pages/v1/setting/level/IndexPage.vue') },
          { path: '/settings/hak_akses', name: 'settings.hak_akses', component: () => import('pages/v1/setting/hak_akses/IndexPage.vue') },
          { path: '/settings/satuan', name: 'settings.satuan', component: () => import('pages/v1/setting/satuan/IndexPage.vue') },
          { path: '/settings/jenis_transaksi', name: 'settings.jenis_transaksi', component: () => import('pages/v1/setting/jenis_transaksi/IndexPage.vue') },
          { path: '/settings/jenis_kas', name: 'settings.jenis_kas', component: () => import('pages/v1/setting/jenis_kas/IndexPage.vue') },
          { path: '/settings/jenis_beban_biaya', name: 'settings.jenis_beban_biaya', component: () => import('pages/v1/setting/jenis_beban_biaya/IndexPage.vue') }
        ]
      },

      { path: '/profile', name: 'profile', component: () => import('pages/v1/profile/IndexPage.vue') }
    ]
  },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/auth/AuthPage.vue') }
    ]
  },
  {
    path: '/registrasi',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/v1/surveyor/prasurveyor/IndexPage.vue') }
    ]
  },
  {
    path: '/regpuskesmas',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/v1/puskesmas/prapuskesmas/IndexPage.vue') }
    ]
  },
  {
    path: '/notifregistrasi',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/v1/surveyor/prasurveyor/NotifRegister.vue') }
    ]
  },
  {
    path: '/veriregister',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', component: () => import('pages/v1/surveyor/prasurveyor/VeriRegister.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
