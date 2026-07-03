// https://github.com/fuxingloh/vue-horizontal/issues/126#issuecomment-1831539849

declare module 'vue-horizontal' {
  import { DefineComponent } from 'vue'
  const VueHorizontal: DefineComponent<
    {
      button?: boolean
      buttonBetween?: boolean
      scroll?: boolean
      responsive?: boolean
      displacement?: number
      snap?: 'start' | 'center' | 'end' | 'none'
    },
    {
      prev: () => void
      next: () => void
      scrollToIndex: (index: number) => void
      scrollToLeft: (distance: number, scrollBehavior: 'smooth' | 'auto') => void
      refresh: () => void
    }
  >

  export default VueHorizontal
}
