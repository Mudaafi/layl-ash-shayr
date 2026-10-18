<script setup lang="ts">
import useEventbrite from '@/stores/eventbrite-store'
import { Checkbox } from '../ui/checkbox'

const emit = defineEmits<{
  checked: []
}>()

const { attendeeId, checkedIn } = defineProps<{ attendeeId: string; checkedIn: boolean }>()

const { toggleCheckInAttendee } = useEventbrite()

function onClick(ev: MouseEvent) {
  emit('checked')

  ev.preventDefault()
  ev.stopPropagation()

  toggleCheckInAttendee(attendeeId)
  console.log('🚀 ~ onClick ~ attendeeId:', attendeeId)
}
</script>

<template>
  <Checkbox @click="onClick" :default-value="checkedIn" />
</template>

<style lang="scss" scoped></style>
