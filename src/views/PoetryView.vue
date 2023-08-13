<script setup lang="ts">
import PoemAuthor from '@/components/PoemAuthor.vue'
import MoonAndStars from '../svgs/MoonAndStars.vue'
import { usePoemsStore, type Poem } from '@/stores/poems'
import { ref } from 'vue'

const props = defineProps<{
  poemTitle: string
}>()
console.log(props)

const isLoading = ref(false)
const isMissing = ref(false)
const errorMsg = ref('')
const poemStore = usePoemsStore()
let poem: Poem = poemStore.poemsByTitle[props.poemTitle]

if (!poem || !poem.poem) {
  isLoading.value = true

  poemStore
    .fetchPoemByTitle(props.poemTitle)
    .catch((e) => {
      isMissing.value = true
      errorMsg.value = e.message
    })
    .then(() => {
      poem = poemStore.poemsByTitle[props.poemTitle]
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <main v-if="isLoading" class="alt">I'm loading...</main>
  <main v-else-if="isMissing" class="alt">{{ errorMsg }}</main>
  <main v-else class="main">
    <div class="poem-title">
      <h1>{{ props.poemTitle }}</h1>
      <MoonAndStars class="top-right-graphic" />
    </div>
    <p class="poem">{{ poem?.poem }}</p>
    <PoemAuthor :poet="poem?.poemAuthor" :poet-bio="poem?.poemAuthorBio" />
  </main>
</template>

<style lang="scss" scoped>
.alt {
  display: flex;
  min-height: 100vh;
  align-items: center;
  font-size: 28px;
}
.main {
  // min-width: 75vw;
  .poem-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    .top-right-graphic {
      height: 96px;
    }
  }
  .poem {
    white-space: pre-line;
    margin-bottom: 72px;
  }
}
</style>
