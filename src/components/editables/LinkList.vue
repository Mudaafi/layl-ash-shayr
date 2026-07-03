<script setup generic="T extends BaseLink" lang="ts">
import { EditableArea, EditableInput, EditablePreview, EditableRoot } from 'reka-ui'
import { EyeClosedIcon, EyeIcon, Move as IconMove } from '@lucide/vue'
import { Toggle } from '../ui/toggle'

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
          <Toggle aria-label="Toggle bold" v-model="item.hidden">
            <EyeIcon class="h-4 w-4" v-if="!item.hidden" />
            <EyeClosedIcon class="h-4 w-4" v-if="item.hidden" />
          </Toggle>
        </div>
      </div>
    </li>
  </ul>
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

    a:hover,
    .editable-field:hover,
    &.sortable-chosen {
      background-color: $secondary;
      // TODO: Different editng experience
      // border: 1px solid $primary-darker;
      color: $primary-darker;
      transition: 0.4s;
      a {
        color: black;
      }
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
  }

  .edit-view {
    display: flex;
    flex-direction: row;
  }
}
</style>
