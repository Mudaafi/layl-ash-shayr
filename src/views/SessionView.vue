<script setup lang="ts">
import { onMounted, ref } from 'vue'

const yes = ref(false)

onMounted(() => {
  setTimeout(() => {
    yes.value = true
  }, 2000)
})

window.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const bg: HTMLElement | null = document.querySelector('.space-bg')
  const posX = Math.floor((x * 100) / windowWidth)
  const posY = Math.floor((y * 100) / windowHeight)
  if (!bg) return
  const a = bg.animate(
    {
      'background-position': `${posX}% ${posY}%`,
      backgroundPositionX: `${posX}%`,
      backgroundPositionY: `${posY}%`
      // translateX: posX
    },
    { duration: 40000, fill: 'forwards' }
  )

  a.onfinish = () => console.log('hi')

  // bg.style.backgroundPosition = `${posX}% ${posY}%`
  // bg.style.rotate = `${posX}deg}`
  // bg.style.backgroundPosition = '100% 100%'

  console.log(`${posX} ${posY}`)
})
</script>

<template>
  <div class="space-bg"></div>

  <div class="constellation-container">
    <img class="constellation" src="../assets/images/constellation-quill.png" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.space-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('../assets/images/constellation-bg.png') no-repeat center center fixed;
  -webkit-background-size: 120%;
  -moz-background-size: 120%;
  -o-background-size: 120%;
  background-size: 150%;
  background-position: 50% 50%;
  overflow: hidden;

  // background-color: red;
}

.constellation-container {
  display: flex;
  position: absolute;
  left: 50%;
  right: 50%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .constellation {
    opacity: 65%;
    height: 50vh;
  }
}
</style>
