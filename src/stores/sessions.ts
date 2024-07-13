import { ref } from 'vue'
import { defineStore } from 'pinia'
import constellationWatermelon from '../assets/images/constellation-watermelon.png'
import constellationMoon from '../assets/images/constellation-moon.png'

import type { GSheetResponse } from '../types'

const GSHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzagodSt3YhOugR-3IrX5-Nz8qxa5wGg1WuEVYhuixnsrqdMyCO6gxFvm-UudkPCyLY/exec'

interface Session {
  id: number
  year: number
  date: Date
  sessionType: 'OPEN_MIC'
  sessionTitle: string
  featuredSpeakers: Array<string>
  poets: Array<string>
  x_pos: number
  y_pos: number
  excerpt?: string
}

const API_CALLS = {
  GET: {
    getSessions: 'getSessions'
  }
}

export const useSessionsStore = defineStore(
  'sessions',
  () => {
    const sessionStore = ref<Session[]>([])

    // Getters
    function getSessionsById(id: number): Session | null {
      return sessionStore.value.find((el) => el.id === id) || null
    }

    function getSessionsByYear(year: number): Array<Session> {
      return sessionStore.value.filter((session) => session.year === year)
    }

    function getSessionConstellation(year: number): string {
      switch (year) {
        case 2023:
          return constellationMoon

        case 2024:
          return constellationWatermelon

        default:
          return ''
      }
    }

    // Actions
    async function fetchSessions() {
      const res: GSheetResponse = await (
        await fetch(`${GSHEET_ENDPOINT}?type=session&function=${API_CALLS.GET.getSessions}`)
      ).json()
      if (res.success) {
        const resBody = res.body as Array<Session>
        sessionStore.value = resBody.map((el) => {
          return {
            ...el,
            date: new Date(el.date)
          }
        })
        console.log(sessionStore)

        return sessionStore
      } else {
        throw new Error(res.errorMsg)
      }
    }

    return {
      sessionStore,
      fetchSessions,
      getSessionsById,
      getSessionsByYear,
      getSessionConstellation
    }
  },
  {
    persist: true
  }
)
