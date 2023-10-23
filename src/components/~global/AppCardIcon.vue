<template>
  <q-card class="full-width full_height">
    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="q-mr-md">
          <q-icon
            :name="icon"
            color="grey"
            size="16px"
          />
        </div>
        <div class="f-16 text-weight-bold">
          {{ title }}
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <slot name="content" />
    </q-card-section>
  </q-card>
</template>
<script setup>

defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  icon: {
    type: String,
    default: 'icon-fa-clipboard-solid'
  }
})
</script>
