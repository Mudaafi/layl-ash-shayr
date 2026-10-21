<!-- Doesn't work, maybe need to redefine the -->
<script setup lang="ts">
import { ArrowUpDown } from '@lucide/vue'
import type { Column_RowSorting, RowData, TableFeatures } from '@tanstack/vue-table'
import type { DataTableFeatures } from './features'
import type { Attendee } from '../../../types'

const { column, name } = defineProps<{
  column: Column_RowSorting<DataTableFeatures, Attendee>
  name: string
}>()

function onClick() {
  column.toggleSorting(column.getIsSorted() === 'asc')
}
</script>

<template>
  <div class="flex h-full items-center" @click="onClick">
    {{ name }} <ArrowUpDown class="ml-2 h-4 w-4" />
  </div>
</template>

<style lang="scss" scoped></style>
