export interface GSheetResponseError {
  success: false
  errorMsg: string
}

export interface GSheertResponseSuccess {
  success: true
  body: object
}

export type GSheetResponse = GSheertResponseSuccess | GSheetResponseError
