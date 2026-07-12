<script setup generic="T extends BaseLink" lang="ts">
import { reactive, ref } from 'vue'
import { EditableArea, EditableInput, EditablePreview, EditableRoot } from 'reka-ui'
import { EyeClosedIcon, EyeIcon, Move as IconMove, PlusIcon, Trash2Icon } from '@lucide/vue'
import { Toggle } from '../ui/toggle'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction
} from '../ui/alert-dialog/'

export interface BaseLink {
  href: string
  displayText: string
  hidden?: boolean
}

const { links, editable } = defineProps<{
  links: Array<T>
  editable?: boolean
}>()

const isMobileWidth = window.matchMedia('(max-width: 1024px)').matches
const isDeletePromptOpen = ref(false)
const deletePromptData = reactive({
  displayText: '',
  index: -1
})

function openDeletePrompt(displayText: string, index: number) {
  deletePromptData.displayText = displayText
  deletePromptData.index = index
  isDeletePromptOpen.value = true
}

function closeDeletePrompt() {
  isDeletePromptOpen.value = false
}

function addLink() {
  links.push({
    href: `${links.length}`,
    displayText: ''
  } as T)
}
</script>

<template>
  <ul class="link-list">
    <li v-for="(item, i) in links" :key="item.href">
      <div v-if="editable || !item.hidden" class="link" :class="item.hidden ? 'is-hidden' : ''">
        <a v-if="!editable" :href="item.href">{{ item.displayText }}</a>
        <div v-if="editable" class="edit-view">
          <div class="flex flex-col justify-center md:mx-[12px] mx-[8px] draggable-handle">
            <IconMove :size="isMobileWidth ? 24 : 32" />
          </div>
          <div class="editable-inputs">
            <div class="editable-field">
              <EditableRoot
                :default-value="item.displayText"
                placeholder="Enter text..."
                class="flex flex-col"
                auto-resize
                @update:model-value="(newValue) => (links[i].displayText = newValue)"
              >
                <EditableArea class="font-bold">
                  <EditablePreview />
                  <EditableInput class="w-full" />
                </EditableArea>
              </EditableRoot>
            </div>
            <div class="editable-field">
              <EditableRoot
                :default-value="item.href"
                placeholder="Enter text..."
                class="flex flex-col"
                auto-resize
                @update:model-value="(newValue) => (links[i].href = newValue)"
              >
                <EditableArea class="italic">
                  <EditablePreview />
                  <EditableInput class="w-full" />
                </EditableArea>
              </EditableRoot>
            </div>
          </div>
          <div class="flex flex-col justify-between">
            <Toggle aria-label="Toggle bold" v-model="item.hidden" class="cursor-pointer">
              <EyeIcon class="h-4 w-4" v-if="!item.hidden" />
              <EyeClosedIcon class="h-4 w-4" v-if="item.hidden" />
            </Toggle>

            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Delete"
              class="dark:hover:text-red-500 cursor-pointer w-full"
              @click="openDeletePrompt(item.displayText, i)"
            >
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </div>
    </li>
    <div class="link link-add" v-if="editable" @click="addLink()">
      <PlusIcon></PlusIcon>
    </div>
  </ul>

  <AlertDialog v-model:open="isDeletePromptOpen">
    <AlertDialogContent @on-overlay-click="closeDeletePrompt()">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center alert-content"
          >Delete "<span class="italic">{{ deletePromptData.displayText }}"</span
          >?</AlertDialogTitle
        >

        <AlertDialogDescription> This action cannot be undone. </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter class="flex flex-row justify-between">
        <AlertDialogCancel class="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-red-400 hover:bg-red-500 cursor-pointer"
          @click="links.splice(deletePromptData.index, 1)"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style lang="scss" scoped>
.link-list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  color: $secondary-lighter;

  @media (min-width: $desktop-width) {
    row-gap: 16px;
    justify-content: center;
  }

  .link a:hover,
  .link .editable-field:hover,
  .sortable-chosen {
    background-color: $secondary;
    // TODO: Different editng experience
    // border: 1px solid $primary-darker;
    color: $primary-darker;
    transition: 0.4s;
    a {
      color: black;
    }
  }

  .link {
    cursor: pointer;
    border: 1px solid $primary;
    border-radius: 8px;
    padding: 4px;
    transition: all 0.15s ease-in;
    text-align: center;
    list-style: none;

    &.is-hidden {
      color: $primary-darker !important;
      border-color: $primary-darker;
    }

    a {
      display: block;
      padding: 10px 14px;
      width: 100%;
      height: 100%;
      font-weight: 500;
    }

    .editable-inputs {
      width: 100%;
      flex-grow: 1;
      .editable-field {
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: text;
      }
    }

    &.link-add {
      border: 2px dashed $primary-darker;
      color: $primary-darker;
      display: flex;
      justify-content: center;
      &:hover {
        border: 2px dashed $primary;
        color: $secondary-lighter;
      }
    }
  }

  .edit-view {
    display: flex;
    flex-direction: row;
  }
}

.alert-content {
  color: $alert;
}
</style>
