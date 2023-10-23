<template>
  <div>
    <div class="row bg-grey q-pa-xs">
      <div class="f-24">
        Level
      </div>
    </div>
    <div class="row q-ma-sm no-wrap q-col-gutter-md">
      <div
        class="col-4"
      >
        <div class="bd-left-form">
          <app-card-icon
            title="Form Level"
          >
            <template #content>
              <div class="row items-center no-wrap">
                <div class="col-2">
                  Nama
                </div>
                <div class="col-10">
                  <app-input
                    label="Nama"
                    outlined
                  />
                </div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <div class="col-2">
                  Level
                </div>
                <div class="col-10">
                  <app-input
                    label="Level"
                    outlined
                  />
                </div>
              </div>
              <div class="row items-center no-wrap justify-end q-mt-xl">
                <div class="q-mr-sm">
                  <app-btn
                    label="Cancel"
                    color="grey"
                  />
                </div>
                <div class="q-mr-sm">
                  <app-btn
                    label="Simpan"
                    color="primary"
                  />
                </div>
              </div>
            </template>
          </app-card-icon>
        </div>
      </div>
      <div class="col-8">
        <div class="bd-left-table">
          <app-card
            title="Tabel Level"
            desc="Level dan nama level yang ada di aplikasi"
          >
            <template #content>
              <app-table
                title=" "
                :columns="table.columns"
                :column-hide="table.columnHide"
                :items="table.items"
                :meta="table.meta"
                :per-page="table.params.per_page"
                :order-by="table.params.order_by"
                :sort="table.params.sort"
                :loading="table.loading"
                :to-search="table.params.q"
                @set-order="table.setOrder"
                @set-row="table.setPerPage"
                @goto="table.setPage"
                @delete-ids="table.deletesData"
                @delete="table.deletesData"
                @find="table.setSearch"
                @refresh="table.refreshTable"
              />
            <!-- @new-data="form.newData"
            @edit-data="form.editData" -->
            </template>
          </app-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLevelTable } from 'src/stores/setting/level/table'
const table = useLevelTable()
table.getDataTable()
</script>
<style lang="scss" scoped>
.bd-left-form{
  border-left: 3px solid #F89C2C;
}
.bd-left-table{
  border-left: 3px solid #1FAE66;
}
</style>
