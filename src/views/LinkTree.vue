<script setup lang="ts">
import LASLogo from '@/components/LASLogo.vue'
import Header from '@/components/Header.vue'
import LinkList from '@/components/editables/LinkList.vue'
import useLinktree from '@/stores/linktree'
import InstagramLink from '@/svgs/InstagramLink.vue'
import TelegramLink from '@/svgs/TelegramLink.vue'
import useEditablePage from '@/stores/editable-page'
import { watch } from 'vue'
import PickOneFromMany from '@/components/editables/PickOneFromMany.vue'
import { VueDraggable } from 'vue-draggable-plus'

const { links, subtitles, isLoading, updateLinktree } = useLinktree()
const { isEditing } = useEditablePage()

watch(isEditing, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    updateLinktree()
  }
})

/**
 * Configs applying to specific tree items
 */
interface ListItemConfigs {
  /**
   * Hex Code
   */
  textColor: string
  /**
   * String representing the CSS-property border
   */
  border: string
}

/**
 * Configs applying to the entire tree and all tree items
 */
interface LinkTreeConfigs extends ListItemConfigs {
  /**
   * Background Image for the entire Linktree
   */
  backgroundImage: string
}

const isMobileWidth = window.matchMedia('(max-width: 1024px)').matches
</script>

<template>
  <!-- TODO: Better Loading Screen -->
  <div v-if="isLoading" class="loading">Loading...</div>
  <div class="grid" v-if="!isLoading">
    <Header />
    <div class="header padded">
      <LASLogo class="logo" :width="!isMobileWidth ? '200px' : '100px'" />
      <h1>Layl Ash-Shayr</h1>
      <div class="catch-phrase">
        <i><PickOneFromMany :options="subtitles" :editable="isEditing" /></i>
      </div>

      <div class="social-media">
        <InstagramLink href="https://www.instagram.com/laylashshayr" class="soc-med" />
        <TelegramLink href="https://t.me/+xJvGbSl6Xa9lNDZl" class="soc-med" />
      </div>
    </div>

    <VueDraggable
      v-model="links"
      target=".link-list"
      draggable="li"
      class="draggable-link-list"
      :disabled="!isEditing"
      handle=".draggable-handle"
    >
      <link-list :links="links" :editable="isEditing" />
    </VueDraggable>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  height: 100dvh;
  justify-content: center;
  align-items: center;
}

@media (min-width: $desktop-width) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2px;
    column-gap: 32px;
  }
}

.logo {
  margin-bottom: 8px;
}

.social-media {
  margin: 12px 0;
  display: flex;
  column-gap: 10px;
  .soc-med {
    width: 32px;
    height: 32px;
    aspect-ratio: 1;
  }

  @media (min-width: $desktop-width) {
    margin: 20px 0;
    .soc-med {
      width: 42px;
      height: 42px;
    }
  }
}

.header {
  text-align: center;
  align-items: center;
  margin-bottom: 24px;

  &.padded {
    padding: 4vh 10vw 0;
    display: flex;
    flex-direction: column;

    @media (min-width: $desktop-width) {
      height: 100dvh;
      justify-content: center;
      padding: 0 4vw;
    }
  }

  h1 {
    color: $secondary;
  }

  .catch-phrase {
    color: $primary-dark;
    font-style: italics;
    line-height: 1;
    margin-top: 8px;
  }
}

.draggable-link-list {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
