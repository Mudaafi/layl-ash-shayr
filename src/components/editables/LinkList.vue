<script setup generic="T extends BaseLink" lang="ts">
import { ref, type Reactive, type Ref } from 'vue'
import { EditableArea, EditableInput, EditablePreview, EditableRoot } from 'reka-ui'

export interface BaseLink {
  href: string
  displayText: string
  hidden?: boolean
}

const { links, editable } = defineProps<{
  links: Array<T>
  editable?: boolean
}>()

const linksToRender = ref<Array<T>>([]) as Ref<Array<T>>

if (!editable) {
  linksToRender.value.push(...links.filter((item) => item.hidden !== true))
}
</script>

<template>
  <ul class="link-list">
    <li v-for="(item, i) in links" class="link">
      <a v-if="!editable" :href="item.href">{{ item.displayText }}</a>
      <div class="editable-field" v-if="editable">
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
      <div class="editable-field" v-if="editable">
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
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.link-list {
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

    & a:hover,
    div:hover {
      background-color: $secondary;
      // TODO: Different editng experience
      // border: 1px solid $primary-darker;
      color: $primary-darker;
      transition: 0.4s;
      a {
        color: black;
      }
    }

    & a {
      display: block;
      padding: 10px 14px;
      width: 100%;
      height: 100%;
      font-weight: 500;
    }

    .editable-field {
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: text;
    }
  }
}
</style>
