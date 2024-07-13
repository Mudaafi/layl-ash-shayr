<script setup lang="ts">
const props = defineProps<{
  width: string
}>()
</script>

<template>
  <div class="logo" :style="{ width: props.width }">
    <div class="image hovered">
      <img src="../assets/images/logo.png" alt="LAS Logo Colored" :style="{ width: props.width }" />
    </div>
    <div class="image inactive">
      <img src="../assets/images/logo-wb.png" alt="LAS Logo" :style="{ width: props.width }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  position: relative;
  aspect-ratio: 1;
}
.image {
  position: absolute;
  transition: opacity 0.35s ease-in-out;
}

.hovered:has(+ .inactive:hover) {
  opacity: 1;
}

.hovered {
  opacity: 0;
}

.inactive {
  opacity: 1;
  &:hover {
    opacity: 0;
  }
}
</style>
