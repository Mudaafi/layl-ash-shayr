<script setup lang="ts">
import InstagramLink from '@/svgs/InstagramLink.vue'

const props = defineProps<{
  poet: string
  poetBio?: string
  instagramLink?: string
  genericLink?: string
}>()
</script>

<template>
  <div class="poem-author">
    <hr />
    <div class="poet">{{ props.poet }}</div>
    <div class="poet-bio" v-if="props.poetBio">{{ props.poetBio }}</div>
    <div class="social-media">
      <a v-if="instagramLink" :href="instagramLink" target="_blank" rel="noopener noreferrer">
        <InstagramLink />
      </a>
      <a v-if="genericLink" :href="genericLink" target="_blank" rel="noopener noreferrer">
        <!-- <GenericLink /> -->
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.poem-author {
  display: flex;
  flex-direction: column;
  align-items: center;
}
hr {
  width: 25vw;
  height: 0;
  border-bottom: white solid 4px;
  margin-bottom: 25px;
}
.poet {
  color: $primary-text-emphasis;
  font-size: 48px;
  font-weight: 400;
  line-height: normal;
}
.poet-bio {
  font-size: 18px;
  line-height: normal;
  font-weight: 400;
}
.social-media {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
}
</style>
