<script setup lang="ts">
import { ref } from 'vue'
import { EyeClosedIcon, EyeIcon } from '@lucide/vue'
import type { Column_ColumnFiltering } from '@tanstack/vue-table'
import type { DataTableFeatures } from './features'
import type { Attendee } from '../../../types'
import useEventbrite from '@/stores/eventbrite-store'

const { column } = defineProps<{
  column: Column_ColumnFiltering<DataTableFeatures, Attendee>
}>()

const { attendees } = useEventbrite()

const hidden = ref(false)

function onClick() {
  hidden.value = !hidden.value

  column.setFilterValue(hidden.value === false ? undefined : false)
  attendees.value = [...attendees.value] // re-render to reset filtering index
}
</script>

<template>
  <div @click="onClick">
    <EyeIcon v-if="!hidden"></EyeIcon>
    <EyeClosedIcon v-else />
  </div>
</template>

<style lang="scss" scoped></style>
