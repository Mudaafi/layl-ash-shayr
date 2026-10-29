<script setup lang="ts">
import type { Table as TanStackTable } from '@tanstack/vue-table'
import { FlexRender } from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { type DataTableFeatures } from './features'
import { getQuestions, type Attendee } from '../../../types'

const props = defineProps<{
  table: TanStackTable<DataTableFeatures, Attendee>
}>()
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :header="header" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <TableRow
              :data-state="row.getIsSelected() && 'selected'"
              @click="() => row.toggleExpanded()"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="(row.original as Attendee).checkedIn ? 'checked-in' :''"
              >
                <FlexRender :cell="cell" />
              </TableCell>
            </TableRow>
            <TableRow v-if="row.getIsExpanded() && getQuestions(row.original).length > 0">
              <TableCell :colspan="row.getAllCells().length">
                <div class="p-4" v-for="entry in getQuestions(row.original)">
                  <div class="font-bold italic">{{ entry[0] }}</div>
                  <div>{{ entry[1] }}</div>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="table.getAllColumns().length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<style lang="scss" scoped>
.checked-in {
  color: grey;
  font-style: italic;
  text-decoration: line-through;
}
</style>
