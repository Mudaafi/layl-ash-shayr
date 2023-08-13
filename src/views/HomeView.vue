<script setup lang="ts">
import PoemsList from '@/components/PoemsList.vue'
</script>

<template>
  <main>
    <div class="logo-container"><img src="../assets/logo-light.png" alt="" class="img" /></div>
    <PoemsList />
  </main>
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  margin-top: 100px;
}
.logo-container {
  display: flex;
  justify-content: center;
  margin: 50px 0;
  .img {
    width: 25vh;
  }
}
</style>
