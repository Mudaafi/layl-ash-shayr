<script setup lang="ts">
import useEventbrite from '@/stores/eventbrite-store'
import { columns } from '@/components/attendees/column'
import DataTable from '@/components/attendees/DataTable.vue'
import { ListChecks, MoveLeftIcon } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'
import { features } from '@/components/attendees/features'
import { useTable } from '@tanstack/vue-table'
import { Input } from '../components/ui/input'
import WalkInForm from '@/components/attendees/WalkInForm.vue'

const { eventId } = defineProps<{
  eventId: string
}>()

const { attendees, fetchAttendees } = useEventbrite()
fetchAttendees(eventId)

const table = useTable({
  features,
  data: attendees,
  columns: columns,
  getRowCanExpand: () => true
})
table.setPageSize(60)

const attendeesCheckedIn = computed(() => attendees.value.filter((a) => !!a.checkedIn).length)
const attendeesTotal = computed(() => attendees.value.length)

const nameFilterValue = computed(() => table.getColumn('name')?.getFilterValue() as string)
const isNameFilterActive = ref(false)
function onNameFilterUpdate(event: string | number) {
  if (event.toString().length > 0) {
    isNameFilterActive.value = true
  } else {
    isNameFilterActive.value = false
  }
  table.getColumn('name')?.setFilterValue(event)
}
function clearFilterName() {
  table.getColumn('name')?.setFilterValue(undefined)
  isNameFilterActive.value = false
}
</script>

<template>
  <main class="event-view">
    <div v-if="attendees === undefined">Loading...</div>
    <div v-else class="container py-8 mx-auto w-dvw">
      <div class="flex flex-row justify-between">
        <RouterLink
          v-if="!isNameFilterActive"
          :to="{ name: 'events-list' }"
          class="events-link minimalist flex items-center"
          ><MoveLeftIcon /> &nbsp; Back to Events</RouterLink
        >
        <div v-else class="events-link minimalist" @click="clearFilterName">Clear Filter</div>
        <div class="flex cursor-default">
          <ListChecks class="mr-1 w-5 self-center list-check-icon" />
          {{ attendeesCheckedIn }} /
          {{ attendeesTotal }}
        </div>
      </div>
      <div>
        <div class="flex items-center py-4 justify-between">
          <Input
            variant="ghost"
            placeholder="Filter name..."
            :model-value="nameFilterValue"
            @update:model-value="(e) => onNameFilterUpdate(e)"
          />

          <WalkInForm />
        </div>
      </div>
      <DataTable :table="table" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.events-link {
  color: $primary-dark;
  transition: color 0.1s ease-in;
  &:hover {
    color: $secondary;
  }
}

.list-check-icon {
  stroke: $success;
}
</style>
