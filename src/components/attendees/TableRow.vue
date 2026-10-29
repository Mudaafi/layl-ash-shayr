<script setup lang="ts">
import { FlexRender, type Row } from '@tanstack/vue-table'
import type { DataTableFeatures } from './features'
import type { Attendee } from '../../../types'
import { TableCell, TableRow } from '@/components/ui/table'
import { shallowRef, useTemplateRef, watch } from 'vue'
import { useSwipe, type UseSwipeDirection } from '@vueuse/core'
import useEventbrite from '@/stores/eventbrite-store'

const props = defineProps<{
  row: Row<DataTableFeatures, Attendee>
}>()

const { toggleCheckInAttendee } = useEventbrite()

const swipableEl = useTemplateRef('swipableEl')
const cssLeft = shallowRef('0')
const cssBg = shallowRef('rgb(0 153 102/ 0%)')
const isSwipeEnd = shallowRef(false)
const swipeMax = window.innerWidth
/** 0<x<1 */
function easeInOutExpo(percentComplete: number): number {
  const prefThreshold = 0.3
  const x = percentComplete / (prefThreshold * 2)

  const scaledX =
    x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2 // 2^(20x-10)
      : (2 - Math.pow(2, -20 * x + 10)) / 2

  return scaledX
}
const isBeyondThreshold = (deltaX: number) =>
  deltaX < 0 && easeInOutExpo(Math.abs(deltaX) / swipeMax) >= 0.8

const { lengthX } = useSwipe(swipableEl as any, {
  // https://github.com/vueuse/vueuse/blob/main/packages/core/useSwipe/demo.vue
  passive: false,
  threshold: 0,
  onSwipe() {
    isSwipeEnd.value = false

    if (lengthX.value < 0) {
      const length = Math.abs(lengthX.value)
      cssLeft.value = `${length}px`
      cssBg.value = `rgb(0 153 102/ ${easeInOutExpo(length / swipeMax) * 100}%)`
    } else {
      cssLeft.value = '0'
      cssBg.value = `rgb(0 153 102/ ${length}%)`
    }
  },
  onSwipeEnd() {
    isSwipeEnd.value = true
    if (isBeyondThreshold(lengthX.value)) {
      toggleCheckInAttendee(props.row.original.attendeeId)
    }

    cssLeft.value = '0'
    cssBg.value = `rgb(0 153 102/ 0%)`
  }
})
</script>

<template>
  <TableRow
    ref="swipableEl"
    :data-state="row.getIsSelected() && 'selected'"
    @click="() => row.toggleExpanded()"
    class="test"
    :class="isSwipeEnd ? 'swipe-end' : ''"
    :style="{ transform: `translateX(${cssLeft})`, backgroundColor: cssBg }"
  >
    <TableCell
      v-for="cell in row.getVisibleCells()"
      :key="cell.id"
      :class="(row.original as Attendee).checkedIn ? 'checked-in' :''"
    >
      <FlexRender :cell="cell" />
    </TableCell>
  </TableRow>
</template>

<style lang="scss" scoped>
.test {
  position: relative;
  transition: background-color ease-out 0.25s;
}

.test.swipe-end {
  transition: transform ease-out 0.25s, background-color ease-out 0.25s;
}

.checked-in {
  color: grey;
  font-style: italic;
  text-decoration: line-through;
}
</style>
