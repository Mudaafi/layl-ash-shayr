<script setup lang="ts">
import LinkList, { type BaseLink } from '@/components/editables/LinkList.vue'
import useEventbrite from '@/stores/eventbrite-store'
import { computed } from 'vue'

const { events, fetchEvents } = useEventbrite()

const links = computed(() =>
  events.value.map((ev) => ({
    href: `${window.location.origin}/events/${ev.id}`,
    displayText: `${ev.name} - ${new Date(ev.datetime).toLocaleString('default', {
      month: 'long'
    })}`
  }))
)

fetchEvents()
</script>

<template>
  <div>Events!</div>

  <LinkList :links="links" />
</template>

<style lang="scss" scoped></style>
