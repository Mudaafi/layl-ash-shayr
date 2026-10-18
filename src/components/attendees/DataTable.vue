<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, useTable } from '@tanstack/vue-table'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { features, type DataTableFeatures } from './features'
import Input from '../ui/input/Input.vue'
import { getQuestions, type Attendee } from '../../../types'
import { Button } from '../ui/button'
import { PlusIcon } from '@lucide/vue'
import router from '@/router'
import { toast } from 'vue-sonner'
import useEventbrite from '@/stores/eventbrite-store'

const props = defineProps<{
  columns: ColumnDef<DataTableFeatures, Attendee>[]
  data: Attendee[]
}>()

const table = useTable({
  features,
  data: computed(() => props.data),
  columns: props.columns,
  getRowCanExpand: () => true
})
table.setPageSize(60)

const { insertWalkIn } = useEventbrite()
const isWalkInFormOpen = ref(false)
const isSelectDropdownOpen = ref(false)
function closeDialog() {
  if (isSelectDropdownOpen.value) {
    isSelectDropdownOpen.value = false
  } else {
    isWalkInFormOpen.value = false
  }
}
const walkIn = ref<Attendee>({ ticketType: 'General' } as any)
async function registerWalkIn(e: SubmitEvent) {
  e.preventDefault()
  const { name, basePrice, ticketType } = walkIn.value

  if (!name || (!basePrice && basePrice !== 0) || !ticketType) {
    toast.error(`error: ${JSON.stringify(walkIn.value)}`)
    return
  }

  walkIn.value.attendeeId = 'walk-' + String(Math.floor(Math.random() * 1000000))
  walkIn.value.orderId = 'walk-' + String(Math.floor(Math.random() * 1000000))
  walkIn.value.eventId = router.currentRoute.value.params.eventId as string
  walkIn.value.checkedIn = true

  // Supabase
  await insertWalkIn(walkIn.value)
  walkIn.value = { ticketType: 'General' } as any
  closeDialog()
}
</script>

<template>
  <div class="flex items-center py-4 justify-between">
    <Input
      variant="ghost"
      placeholder="Filter name..."
      :model-value="table.getColumn('name')?.getFilterValue() as string"
      @update:model-value="table.getColumn('name')?.setFilterValue($event)"
    />
    <AlertDialog v-model:open="isWalkInFormOpen">
      <AlertDialogTrigger as-child>
        <Button variant="success" class="" @click="() => {}"><PlusIcon /></Button>
      </AlertDialogTrigger>

      <AlertDialogContent @on-overlay-click="closeDialog">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-center">Register Walk-in</AlertDialogTitle>
          <form @submit="registerWalkIn">
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel for="name-new">Name</FieldLabel>
                    <Input
                      v-model="walkIn.name"
                      id="name-new"
                      placeholder="Future Poet"
                      required
                      variant="outline"
                    />
                  </Field>
                  <!-- eventId parsed, attendeeId & orderId randomized -->
                  <Field>
                    <FieldLabel for="basePrice-new">Amount Paid</FieldLabel>
                    <Input
                      id="basePrice-new"
                      placeholder="5.67"
                      :default-value="5"
                      required
                      type="currency"
                      v-model="walkIn.basePrice"
                      variant="outline"
                    />
                  </Field>
                  <Field>
                    <FieldLabel for="quantity-new">Quantity</FieldLabel>
                    <Input
                      id="quantity-new"
                      placeholder="1"
                      :default-value="1"
                      required
                      type="number"
                      v-model="walkIn.quantity"
                      variant="outline"
                    />
                  </Field>
                  <div class="flex flex-col">
                    <Field>
                      <FieldLabel for="ticketType-new">Ticket Type</FieldLabel>
                      <Select
                        default-value="General"
                        v-model="walkIn.ticketType"
                        required
                        @update:open="(e) => (e === true ? (isSelectDropdownOpen = true) : null)"
                        @update:model-value="() => (isSelectDropdownOpen = false)"
                      >
                        <SelectTrigger id="ticketType-new">
                          <SelectValue placeholder="General" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General"> General Admission </SelectItem>
                          <SelectItem value="Supporter"> LAS Supporter </SelectItem>
                          <SelectItem value="Open Miccer">Open Miccer</SelectItem>
                          <SelectItem value="Waitlist">Waitlist</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field orientation="horizontal" class="justify-end mt-4">
                    <Button variant="outline" type="button" @click="closeDialog()">Cancel</Button>
                    <Button variant="success">Submit</Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  </div>

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
            <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
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
