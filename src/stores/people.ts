import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { GSheetResponse } from '../types'

const GSHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzagodSt3YhOugR-3IrX5-Nz8qxa5wGg1WuEVYhuixnsrqdMyCO6gxFvm-UudkPCyLY/exec'

interface People {
  name: string
}

export type Department = 'marketing' | 'admin' | 'outreach' | 'tech'
interface Volunteer extends People {
  quote: string
  department: Department
  bios: string
  imageLink: string
  instagram: string
  email: string
}

interface Committee extends Volunteer {
  alias: string
  role: string
}

interface Poet extends Volunteer {}

const API_CALLS = {
  GET: {
    getVolunteers: 'getVolunteers',
    getCommittee: 'getCommittee',
    getPoets: 'getPoets'
  }
}

export const usePeopleStore = defineStore(
  'people',
  () => {
    const peopleStore = ref<People[]>([])
    const committeeStore = ref<Committee[]>([])
    const volunteerStore = ref<Volunteer[]>([])
    const poetStore = ref<Poet[]>([])

    // Getters
    function getPoetByName(poetName: string): Poet | undefined {
      return poetStore.value.find((poet) => poet.name === poetName)
    }

    // Returns a list of committee
    async function fetchCommittee() {
      const res: GSheetResponse = await (
        await fetch(`${GSHEET_ENDPOINT}?type=people&function=${API_CALLS.GET.getCommittee}`)
      ).json()
      if (res.success) {
        committeeStore.value = res.body as Array<Committee>
      } else {
        throw new Error(res.errorMsg)
      }
    }

    async function fetchVolunteers() {
      const res: GSheetResponse = await (
        await fetch(`${GSHEET_ENDPOINT}?type=people&function=${API_CALLS.GET.getVolunteers}`)
      ).json()
      if (res.success) {
        volunteerStore.value = res.body as Array<Volunteer>
      } else {
        throw new Error(res.errorMsg)
      }
    }

    async function fetchPoets() {
      const res: GSheetResponse = await (
        await fetch(`${GSHEET_ENDPOINT}?type=people&function=${API_CALLS.GET.getPoets}`)
      ).json()
      if (res.success) {
        poetStore.value = res.body as Array<Volunteer>
      } else {
        throw new Error(res.errorMsg)
      }
    }

    return {
      fetchCommittee,
      fetchVolunteers,
      fetchPoets,
      getPoetByName,
      peopleStore,
      committeeStore,
      volunteerStore
    }
  },
  {
    persist: true
  }
)
