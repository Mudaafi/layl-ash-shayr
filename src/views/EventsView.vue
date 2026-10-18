<script setup lang="ts">
import useEventbrite from '@/stores/eventbrite-store'
import { columns } from '@/components/attendees/column'
import DataTable from '@/components/attendees/DataTable.vue'
import { MoveLeftIcon } from '@lucide/vue'
import { RouterLink } from 'vue-router'

const { eventId } = defineProps<{
  eventId: string
}>()

const { attendees, fetchAttendees } = useEventbrite()
fetchAttendees(eventId)
</script>

<template>
  <main class="event-view">
    <div v-if="attendees === undefined">Loading...</div>
    <div v-else class="container py-8 mx-auto w-dvw">
      <RouterLink :to="{ name: 'events-list' }" class="events-link minimalist flex items-center"
        ><MoveLeftIcon /> &nbsp; Back to Events</RouterLink
      >
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
</style>
