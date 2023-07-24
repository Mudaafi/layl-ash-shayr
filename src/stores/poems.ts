import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import type { GSheetResponse } from '../types'

const GSHEET_STORE =
  'https://script.google.com/macros/s/AKfycbw2Eh5t4DcK3SeTqk7M6vOclV4J1AC7-d_H_f2_okq0jWjU8it94ivXDraSZriwHkNh/exec'

export interface Poem {
  poemTitle: string
  poem: string
  poemAuthor: string
  poemAuthorBio: string
  session?: string
  instagramLink?: string
  genericLink?: string
  backgroundImage?: string
  headerImage?: string
}

export const usePoemsStore = defineStore('poems', () => {
  const poemStore = reactive<Poem[]>([])

  // Returns a stored that's keyed by the poem title
  const poemsByTitle = computed(() => {
    const poemsByTitle: { [poemTitle: string]: Poem } = {}
    poemStore.forEach((poem) => {
      poemsByTitle[poem.poemTitle] = poem
    })
    return poemsByTitle
  })

  // fetch the poem
  async function fetchPoemByTitle(poemTitle: string) {
    const res: GSheetResponse = await (
      await fetch(`${GSHEET_STORE}?type=poem&poemTitle=${poemTitle}`)
    ).json()
    if (res.success) {
      const poem = res.body as Poem
      poemStore.push(poem)
    } else {
      throw new Error(res.errorMsg)
    }
  }

  return { poemStore, poemsByTitle, fetchPoemByTitle }
})
