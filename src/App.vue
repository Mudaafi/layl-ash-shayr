<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { RouterView } from 'vue-router'
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

const mode = useColorMode()
mode.value = 'dark'
</script>

<template>
  <!-- <Header /> -->
  <RouterView />
  <!-- <Footer /> -->
  <Toaster position="top-right" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
