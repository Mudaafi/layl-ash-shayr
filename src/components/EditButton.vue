<script setup lang="ts">
import IconEdit from './icons/IconEdit.vue'
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
    <IconEdit class="icon" />
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
    width: 32px;
    margin: 0;
    fill: #fff;
    transition: fill 0.175s ease-in;
    &:hover {
      fill: $secondary;
    }
  }
}
</style>
