import { onBeforeMount, onUnmounted, ref } from 'vue'

const isEditing = ref(false)
const isEditablePage = ref<boolean>(false)

export default function useEditablePage(isRoot: boolean = false) {
  onBeforeMount(() => {
    if (!isRoot) {
      isEditablePage.value = true
      isEditing.value = false
    }
  })

  onUnmounted(() => {
    if (!isRoot) {
      isEditablePage.value = false
      isEditing.value = false
    }
  })

  return {
    isEditablePage,
    isEditing
  }
}
