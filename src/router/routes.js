
const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: '/dashboard', name: 'dashboard', component: () => import('pages/IndexPage.vue') },
      { path: '/user', name: 'user', component: () => import('pages/v1/user/IndexPage.vue') },
      {
        path: '/laporan',
        name: 'laporan',
        component: () => import('pages/v1/laporan/IndexPage.vue'),
        children: [
          { path: '/laporan', redirect: '/laporan/laporan_keuangan' },
          { path: '/laporan/laporan_keuangan', name: 'laporan.laporan_keuangan', component: () => import('pages/v1/laporan/laporan_keuangan/IndexPage.vue') },
          { path: '/laporan/laporan_keuangan_b', name: 'laporan.laporan_keuangan_b', component: () => import('pages/v1/laporan/laporan_keuangan_b/IndexPage.vue') },
          { path: '/laporan/laporan_pembelian', name: 'laporan.laporan_pembelian', component: () => import('pages/v1/laporan/laporan_pembelian/IndexPage.vue') },
          { path: '/laporan/laporan_pengeluaran_kas', name: 'laporan.laporan_pengeluaran_kas', component: () => import('pages/v1/laporan/laporan_pengeluaran_kas/IndexPage.vue') },
          { path: '/laporan/laporan_penjualan', name: 'laporan.laporan_penjualan', component: () => import('pages/v1/laporan/laporan_penjualan/IndexPage.vue') },
          { path: '/laporan/rekap_kasir_harian', name: 'laporan.rekap_kasir_harian', component: () => import('pages/v1/laporan/rekap_kasir_harian/IndexPage.vue') }
        ]
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('pages/v1/history/IndexPage.vue'),
        children: [
          { path: '/history', redirect: '/history/history_pembelian' },
          { path: '/history/history_pembelian', name: 'history.history_pembelian', component: () => import('pages/v1/history/history_pembelian/IndexPage.vue') },
          { path: '/history/history_pengeluaran_kas', name: 'history.history_pengeluaran_kas', component: () => import('pages/v1/history/history_pengeluaran_kas/IndexPage.vue') },
          { path: '/history/history_penjualan', name: 'history.history_penjualan', component: () => import('pages/v1/history/history_penjualan/IndexPage.vue') },
          { path: '/history/pembayaran_hutang', name: 'history.pembayaran_hutang', component: () => import('pages/v1/history/pembayaran_hutang/IndexPage.vue') },
          { path: '/history/return_pembelian', name: 'history.return_pembelian', component: () => import('pages/v1/history/return_pembelian/IndexPage.vue') },
          { path: '/history/return_penjualan', name: 'history.return_penjualan', component: () => import('pages/v1/history/return_penjualan/IndexPage.vue') }
        ]
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('pages/v1/member/IndexPage.vue'),
        children: [
          { path: '/member', redirect: '/member/cetak_kartu' },
          { path: '/member/cetak_kartu', name: 'member.cetak_kartu', component: () => import('pages/v1/member/cetak_kartu/IndexPage.vue') }
        ]
      },
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
