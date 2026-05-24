<script setup lang="ts">
import LASLogo from '@/components/LASLogo.vue'
import InstagramLink from '@/svgs/InstagramLink.vue'

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
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfGPK7t3ogfPRha-fW6h8SAYsQuH_axb0WOj0cMmjaBgz2_cA/viewform',
    displayText: '19 April Book Launch 🎟️'
  },
  {
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdGLrqDY73mKn7D2urlf4aAkMN71ILfSFzgVizYKR8vt90L3A/viewform',
    displayText: 'Volunteer with LAS!'
  },
  {
    href: 'https://t.me/+xJvGbSl6Xa9lNDZl',
    displayText: 'Join our telegram group chat for updates!'
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
  <div class="header padded">
    <LASLogo class="logo" :width="!isMobileWidth ? '66px' : '100px'" />
    <h1>Layl Ash Shayr</h1>
    <div class="catch-phrase">
      <i>{{ subtitle }}</i>
    </div>

    <div class="social-media">
      <InstagramLink href="https://www.instagram.com/laylashshayr" class="soc-med" />
      <InstagramLink href="https://www.instagram.com/laylashshayr" class="soc-med" />
    </div>
  </div>
  <ul class="linktree">
    <li v-for="item in list" class="link">
      <a :href="item.href">{{ item.displayText }}</a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.logo {
  margin-bottom: 8px;
}

.social-media {
  margin: 12px 0 0;
  display: flex;
  column-gap: 10px;
  .soc-med {
    width: 32px;
    aspect-ratio: 1;
    object-fit: contain;
  }
}

.padded {
  padding: 4vh 10vw 0;
  display: flex;
  flex-direction: column;

  @media (min-width: $desktop-width) {
    padding: 0 20vw;
    height: 100vh;
    justify-content: center;
  }
}

.header {
  text-align: center;
  align-items: center;
  margin-bottom: 24px;

  @media (min-width: $desktop-width) {
    margin-bottom: 24px;
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
  display: grid;
  row-gap: 14px;

  @media (min-width: $desktop-width) {
    row-gap: 16px;
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
