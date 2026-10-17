<script setup lang="ts">
import useEventbrite from '@/stores/eventbrite-store'
import { columns } from '@/components/attendees/column'
import DataTable from '@/components/attendees/DataTable.vue'

const { eventId } = defineProps<{
  eventId: string
}>()

const { attendees, fetchAttendees } = useEventbrite()
fetchAttendees(eventId)
</script>

<template>
  <main class="event-view">
    <div v-if="attendees === undefined">Loading...</div>
    <div v-else class="container py-10 mx-auto w-dvw">
      <DataTable :columns="columns" :data="attendees" />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
