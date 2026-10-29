<script setup lang="ts">
import type { Table as TanStackTable } from '@tanstack/vue-table'
import { FlexRender } from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow as GeneralTableRow
} from '@/components/ui/table'
import { type DataTableFeatures } from './features'
import { getQuestions, type Attendee } from '../../../types'
import TableRow from './TableRow.vue'

const props = defineProps<{
  table: TanStackTable<DataTableFeatures, Attendee>
}>()
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <GeneralTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :header="header" />
          </TableHead>
        </GeneralTableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <TableRow :row="row" />
            <GeneralTableRow v-if="row.getIsExpanded() && getQuestions(row.original).length > 0">
              <TableCell :colspan="row.getAllCells().length">
                <div class="p-4" v-for="entry in getQuestions(row.original)">
                  <div class="font-bold italic">{{ entry[0] }}</div>
                  <div>{{ entry[1] }}</div>
                </div>
              </TableCell>
            </GeneralTableRow>
          </template>
        </template>
        <template v-else>
          <GeneralTableRow>
            <TableCell :colspan="table.getAllColumns().length" class="h-24 text-center">
              No results.
            </TableCell>
          </GeneralTableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<style lang="scss" scoped></style>
