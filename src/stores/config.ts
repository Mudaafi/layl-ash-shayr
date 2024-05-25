import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import type { GSheetResponse } from '../types'

const GSHEET_STORE =
  'https://script.google.com/macros/s/AKfycbw2Eh5t4DcK3SeTqk7M6vOclV4J1AC7-d_H_f2_okq0jWjU8it94ivXDraSZriwHkNh/exec'
