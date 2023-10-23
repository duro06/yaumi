<template>
  <div>
    <div class="row bg-grey q-pa-xs">
      <div class="f-24">
        Level
      </div>
    </div>
    <div class="row q-ma-md no-wrap justify-start">
      <div
        class="q-mr-md"
        style="width:300px;"
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
      <div class="">
        <div class="bd-left-table">
          anu
          table
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bd-left-form{
  border-left: 3px solid #F89C2C;
}
.bd-left-table{
  border-left: 3px solid #1FAE66;
}
</style>
