<script setup lang="ts">
import { EditIcon } from '@lucide/vue'
import IconSave from './icons/IconSave.vue'
import useEditablePage from '@/stores/editable-page.js'

const emit = defineEmits<{
  isEditing: [boolean]
}>()

const { isEditing, isEditablePage } = useEditablePage(true)
</script>

<template>
  <button
    v-if="!isEditing && isEditablePage"
    @click="
      () => {
        isEditing = true
        $emit('isEditing', true)
      }
    "
  >
    <EditIcon class="icon" />
  </button>
  <button
    v-else-if="isEditablePage"
    @click="
      () => {
        isEditing = false
        $emit('isEditing', false)
      }
    "
  >
    <IconSave class="icon" />
  </button>
</template>

<style lang="scss" scoped>
button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  .icon {
    width: 24px;
    height: 24px;
    margin: 0;
    transition: stroke 0.175s ease-in;
    stroke-width: 1px;
    &:hover {
      stroke: $secondary;
    }
  }
}
</style>
