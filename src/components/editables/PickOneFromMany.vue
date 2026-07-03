<script setup lang="ts">
import { ref } from 'vue'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter
} from '../ui/alert-dialog'
import { EditableArea, EditableInput, EditablePreview, EditableRoot } from 'reka-ui'
import Button from '../ui/button/Button.vue'
import { Plus, Trash2Icon } from '@lucide/vue'

const { options, editable = false } = defineProps<{
  options: Array<string>
  editable?: boolean
}>()

const selectedString = options[Math.floor(Math.random() * options.length)]

const isOpen = ref(false)
function closeDialog() {
  isOpen.value = false
}
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogTrigger as-child>
      <div :class="editable ? 'editing' : ''" ref="container">
        {{ selectedString }}
      </div>
    </AlertDialogTrigger>
    <AlertDialogContent @on-overlay-click="closeDialog">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Cool one-liners</AlertDialogTitle>
      </AlertDialogHeader>

      <ul class="possible-subtitles">
        <li v-for="(item, i) in options">
          <div class="editable-field" v-if="editable">
            <div class="flex flex-row">
              <EditableRoot
                :default-value="item"
                placeholder="Add a new subtitle..."
                class="flex flex-col flex-grow"
                auto-resize
                @update:model-value="(newValue) => (options[i] = newValue)"
              >
                <EditableArea class="text-sm text-box">
                  <EditablePreview />
                  <EditableInput class="w-full text-sm" />
                </EditableArea>
              </EditableRoot>

              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Delete"
                class="text-red-500 dark:hover:text-red-500 cursor-pointer"
                @click="options.splice(i, 1)"
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </li>
      </ul>

      <AlertDialogFooter class="text-center justify-center sm:justify-center">
        <Button
          variant="outline"
          size="icon-lg"
          aria-label="Submit"
          class="text-green-500 dark:hover:text-green-500 cursor-pointer"
          @click="options.push('')"
        >
          <Plus />
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style lang="scss" scoped>
.editing {
  border: 2px white dashed;
  cursor: pointer;

  &:hover {
    background-color: $secondary;
    // TODO: Different editng experience
    // border: 1px solid $primary-darker;
    color: $primary-darker;
    transition: 0.4s;
    a {
      color: black;
    }
  }
}

.possible-subtitles {
  .editable-field {
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: text;
    // border: 0.5px solid $primary;
    padding: 2px;
    height: 100%;
    // CHECKPOINT
    & input:active {
      color: $secondary;
    }
  }
}

// web.dev Border Animations

.animate-border-one {
  --border-size: 0.1rem;
  border: var(--border-size) dotted transparent;
  background-image: linear-gradient(to right, rgb(38, 36, 36), rgb(38, 36, 36)),
    conic-gradient(from var(--angle), #fbb300 90deg 180deg, #377af5 180deg 270deg);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  animation: rotate 4s linear infinite;
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}
</style>
