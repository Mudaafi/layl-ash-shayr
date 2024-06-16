<script setup lang="ts">
import { usePoemsStore } from '@/stores/poems'

const poemStore = usePoemsStore()
poemStore.fetchPoemList()
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  text-align: center;
  row-gap: 8px;
  .poem {
    font-size: 25px;
    margin-bottom: 4px;
  }
}
</style>
