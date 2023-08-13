<script setup lang="ts">
import { usePoemsStore } from '@/stores/poems'

const poemStore = usePoemsStore()
poemStore.fetchPoemList()

// const props = defineProps<{}>()
</script>

<template>
  <div class="poem-list">
    <div class="poem" v-for="poem in poemStore.poemList" :key="poem.poemTitle">
      <router-link :to="`/poetry/${poem.poemTitle}`">
        {{ poem.poemTitle }} - {{ poem.poemAuthor }}
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.poem-list {
  text-align: center;
  .poem {
    margin-bottom: 4px;
  }
}
</style>
