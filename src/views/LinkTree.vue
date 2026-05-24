<script setup lang="ts">
import LASLogo from '@/components/LASLogo.vue'
import InstagramLink from '@/svgs/InstagramLink.vue'
import TelegramLink from '@/svgs/TelegramLink.vue'

/**
 * API -> Array of objects {}
 * - Firestore? Or google?
 * Cache - Pinia
 * For each array, we render a list item
 * List item props: object + styles (future)
 */

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

interface ListItem {
  href: string
  displayText: string
}

const list: Array<ListItem> = [
  {
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSc9ROXFF7StwvdiWopEkzBw40ANmdHxb5Yqyszuqm7pZRWXnw/viewform',
    displayText: 'March Feedback ✍🏼'
  },
  {
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdGLrqDY73mKn7D2urlf4aAkMN71ILfSFzgVizYKR8vt90L3A/viewform',
    displayText: 'Volunteer with LAS!'
  },
  {
    href: 'https://laylashshayr.com/anthology',
    displayText: 'Buy Our Anthology!'
  }
]

const subtitles = [
  'Just a group of SG Muslim lit fans, building our little community day by day',
  'Poetry under the loving gaze of the moon'
]

const subtitle = Math.floor(Math.random() * 10) > 5 ? subtitles[0] : subtitles[1]
const isMobileWidth = window.matchMedia('(max-width: 1024px)').matches
</script>

<template>
  <div class="grid">
    <div class="header padded">
      <LASLogo class="logo" :width="!isMobileWidth ? '200px' : '100px'" />
      <h1>Layl Ash Shayr</h1>
      <div class="catch-phrase">
        <i>{{ subtitle }}</i>
      </div>

      <div class="social-media">
        <InstagramLink href="https://www.instagram.com/laylashshayr" class="soc-med" />
        <TelegramLink href="https://t.me/+xJvGbSl6Xa9lNDZl" class="soc-med" />
      </div>
    </div>
    <ul class="linktree">
      <li v-for="item in list" class="link">
        <a :href="item.href">{{ item.displayText }}</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: $desktop-width) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2px;
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

  h1,
  div {
    color: $secondary;
  }

  .catch-phrase {
    color: $primary-dark;
    font-style: italics;
    line-height: 1;
    margin-top: 8px;
  }
}

.linktree {
  display: flex;
  flex-direction: column;
  row-gap: 14px;

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

    &:hover {
      background-color: $secondary;
      border: 1px solid $primary-darker;
      color: $primary-darker;
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
  }
}
</style>
