<script setup lang="ts">
import { ref } from 'vue'

const isSpilt = ref(false)

function spillBottle() {
  isSpilt.value = true
}
</script>

<template>
  <main class="landing-bg">
    <div class="ink-bottle" :class="!isSpilt ? 'ink-bottle-start' : 'spilt'" @click="spillBottle">
      <img class="ink-bottle" src="../assets/images/ink-bottle-1.png" alt="" />
      <img class="ink-bottle-darker" src="../assets/images/ink-bottle-1.png" alt="" />
      <img class="ink-bottle-darker" src="../assets/images/ink-bottle-1.png" alt="" />
      <img class="ink-bottle-darker" src="../assets/images/ink-bottle-1.png" alt="" />
    </div>
    <div class="drops">
      <div class="drop drop-0" :class="isSpilt && 'spilling'"></div>
      <div class="drop drop-1" :class="isSpilt && 'spilling'"></div>
      <div class="drop drop-2" :class="isSpilt && 'spilling'"></div>
      <div class="drop drop-3" :class="isSpilt && 'spilling'"></div>
    </div>
    <div class="splotch" :class="isSpilt && 'spilling'"></div>
  </main>
</template>

<style lang="scss" scoped>
$drops-delay: 1.25s;

.landing-bg {
  background-color: $primary;
  width: 100vw;
  height: 100vh;
  color: $bg;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow: hidden;
}

.splotch {
  width: 1vw;
  height: 1vh;
  border-radius: 100%;
  transform: translateY(27vh) translateX(-1vw);
  z-index: 1;
  background-color: $bg;
  opacity: 0;

  &.spilling {
    animation: spillGrowing 3s ease-in forwards;
    animation-delay: $drops-delay + 1s;
  }

  @keyframes spillGrowing {
    0% {
      opacity: 0;
      transform: translateY(27vh) translateX(-1vw);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: scaleX(200) scaleY(200);
    }
  }
}

.drops {
  z-index: 8;

  .drop {
    width: 1vw;
    height: 1vw;
    max-width: 1vw;
    max-height: 1vw;
    border-radius: 100%;
    background-color: $bg;
    opacity: 0;
    transition: transform 1s ease-in infinite;

    &.drop-1.spilling {
      animation: spilling 2s ease-in infinite;
      animation-delay: $drops-delay;
    }
    &.drop-2.spilling {
      animation: spilling 1.4s ease-in infinite;
      animation-delay: 1s + $drops-delay;
    }
    &.drop-3.spilling {
      animation: spilling 1.8s ease-in infinite;
      animation-delay: 1.5s + $drops-delay;
    }
    &.drop-4.spilling {
      animation: spilling 1.2s ease-in infinite;
      animation-delay: 2s + $drops-delay;
    }
  }

  @keyframes spilling {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    50% {
      opacity: 1;
      transform: translateY(25vh);
    }
    65% {
      opacity: 0;
      transform: translateY(25vh);
    }

    99% {
      opacity: 0;
    }
    100% {
      transform: translateY(0);
    }
  }
}

.ink-bottle {
  z-index: 10;
  position: relative;
  display: flex;
  cursor: pointer;
  transition: transform 1.25s cubic-bezier(0.79, 0, 0.47, 0.97);

  .ink-bottle-darker {
    position: absolute;
    transition: opacity 0.25s ease-in-out, transform 1.25s cubic-bezier(0.79, 0, 0.47, 0.97);
  }

  &:not(.spilt) .ink-bottle-darker {
    opacity: 0;
  }

  &:not(.spilt):hover .ink-bottle-darker {
    opacity: 0.65;
  }

  &.spilt {
    img {
      transform: rotate(90deg);
    }
  }
}
</style>
