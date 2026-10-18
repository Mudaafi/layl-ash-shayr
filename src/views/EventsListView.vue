<script setup lang="ts">
import LinkList, { type BaseLink } from '@/components/editables/LinkList.vue'
import Header from '@/components/Header.vue'
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
  <Header />
  <div>
    <h1 class="heading my-10 justify-center text-center">Events!</h1>

    <LinkList :links="links" />
  </div>
</template>

<style lang="scss" scoped>
h1.heading {
  color: $secondary;
}
</style>
