<script setup lang="ts">
import useEventbrite from '@/stores/eventbrite-store'
import { columns } from '@/components/attendees/column'
import DataTable from '@/components/attendees/DataTable.vue'
import { ListChecks, MoveLeftIcon } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const { eventId } = defineProps<{
  eventId: string
}>()

const { attendees, fetchAttendees } = useEventbrite()
fetchAttendees(eventId)

const attendeesCheckedIn = computed(() => attendees.value.filter((a) => !!a.checkedIn).length)
const attendeesTotal = computed(() => attendees.value.length)
</script>

<template>
  <main class="event-view">
    <div v-if="attendees === undefined">Loading...</div>
    <div v-else class="container py-8 mx-auto w-dvw">
      <div class="flex flex-row justify-between">
        <RouterLink :to="{ name: 'events-list' }" class="events-link minimalist flex items-center"
          ><MoveLeftIcon /> &nbsp; Back to Events</RouterLink
        >
        <div class="flex cursor-default">
          <ListChecks class="mr-1 w-5 self-center list-check-icon" />
          {{ attendeesCheckedIn }} /
          {{ attendeesTotal }}
        </div>
      </div>
      <DataTable :columns="columns" :data="attendees" />
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
