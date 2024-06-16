import { computed, ref } from 'vue'
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
}

interface Committee extends Volunteer {
  alias: string
  role: string
}

const API_CALLS = {
  GET: {
    getVolunteers: 'getVolunteers',
    getCommittee: 'getCommittee'
  }
}

export const usePeopleStore = defineStore('poems', () => {
  const peopleStore = ref<People[]>([])
  const committeeStore = ref<Committee[]>([])
  const volunteerStore = ref<Volunteer[]>([])

  // Returns a list that's keyed by the person's S/N
  const peopleByName = computed(() => {
    const peopleByName: { [poemTitle: string]: People } = {}
    peopleStore.value.forEach((person) => {
      peopleByName[person.name] = person
    })
    return peopleByName
  })

  // Returns a list of committee
  async function fetchCommittee() {
    const res: GSheetResponse = await (
      await fetch(`${GSHEET_ENDPOINT}?type=people&function=${API_CALLS.GET.getCommittee}`)
    ).json()
    if (res.success) {
      console.log(res)
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
      console.log(res)

      volunteerStore.value = res.body as Array<Volunteer>
    } else {
      throw new Error(res.errorMsg)
    }
  }

  return {
    fetchCommittee,
    fetchVolunteers,
    peopleByName,
    peopleStore,
    committeeStore,
    volunteerStore
  }
})
