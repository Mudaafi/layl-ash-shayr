<script setup lang="ts">
import { computed, ref } from 'vue'

const launchTime = 1720850400000
const timeLeft = ref(launchTime - Date.now())

function parseTimeLeft(timeLeft: number) {
  const seconds = Math.floor((timeLeft / 1000) % 60)
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

  return {
    timeLeft,
    days,
    hours,
    minutes,
    seconds
  }
}

const timeObj = computed(() => parseTimeLeft(timeLeft.value))
const hasLaunched = computed(() => timeLeft.value <= 0)

setInterval(() => {
  const timeNow = Date.now()
  timeLeft.value = launchTime - timeNow
}, 1000)
</script>

<template>
  <div class="countdown" v-if="!hasLaunched">
    <div class="title">Layl Ash-Shayr Vol 1</div>
    <div class="clock">
      {{ timeObj.days }}d {{ timeObj.hours }}h {{ timeObj.minutes }}m {{ timeObj.seconds }}s
    </div>
    <div class="subtitle">Coming Soon</div>
  </div>
  <div v-else>
    <iframe
      class="pdf-viewer"
      src="https://drive.google.com/file/d/1ZpWYsU3yZHQEZZpo8DyObhmUzUy-PM7P/preview"
      allow="autoplay"
    ></iframe>
  </div>
</template>

<style lang="scss" scoped>
.countdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .title {
    font-family: 'Volkorn';
    font-size: 4vw;
  }

  .clock {
    color: white;
    font-size: 11vw;
    font-family: 'Orbitron';
    font-weight: 500;

    width: 100%;
    text-align: center;
  }

  .subtitle {
    font-family: 'Volkorn';
    font-size: 1vw;
  }
}

.pdf-viewer {
  height: 90vh;
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
``
