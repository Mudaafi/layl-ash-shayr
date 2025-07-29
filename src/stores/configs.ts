import type { GSheetResponse } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { GSHEET_ENDPOINT } from '@/constants'

const API_CALLS = {
  GET: {
    getConfigs: 'getConfigs'
  }
}

export const useConfigStore = defineStore(
  'configs',
  () => {
    const nextSessionSignUpLink = ref<string | undefined>()
    const volunteerSignUpLink = ref<string | undefined>()
    const purchaseAnthologyLink = ref<string | undefined>()

    // Actions
    async function getConfigs() {
      // const res: GSheetResponse = await (
      //   await fetch(`${GSHEET_ENDPOINT}?type=configs&function=${API_CALLS.GET.getConfigs}`)
      // ).json()

      const res = {
        success: true,
        body: {
          nextSessionSignUpLink:
            'https://docs.google.com/forms/d/e/1FAIpQLSfYIdUdcy0OGszabxENZ6YkY49secjLMW37VbW_8EjKecjlvQ/viewform?usp=header',
          purchaseAnthologyLink: 'https://laylashshayr.com/anthology',
          volunteerSignUpLink:
            'https://docs.google.com/forms/d/e/1FAIpQLSdnJUGj3ILy6bOpQ-pb76kAFjefaBPeee4HGkMkSnZv3ys7sA/viewform?usp=sf_link'
        }
      }

      if (res.success) {
        const resBody = res.body as any

        nextSessionSignUpLink.value = resBody['nextSessionSignUpLink']
        volunteerSignUpLink.value = resBody['volunteerSignUpLink']
        purchaseAnthologyLink.value = resBody['purchaseAnthologyLink']
      }
    }

    return {
      volunteerSignUpLink,
      nextSessionSignUpLink,
      purchaseAnthologyLink,
      getConfigs
    }
  },
  {
    persist: true
  }
)
