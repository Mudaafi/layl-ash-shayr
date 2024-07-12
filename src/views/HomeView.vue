<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
const show = false
</script>

<template>
  <div class="bootstrap-home" v-if="!show">
    <NavBar />
    <div class="items">
      <TelegramLink class="soc-med" />

      <h1>Layl Ash-Shayr</h1>
      <div class="catch-line"><i>Poetry under the loving gaze of the moon</i></div>
    </div>
  </div>

  <div v-if="show">
    <div class="bg-image">
      <img src="../assets/images/paint-spill.png" alt="" />
    </div>
    <main class="bg">
      <div class="poetry">
        <div class="ink-bottle">
          <!-- lmao can I just use one image here please -->
          <img defer class="ink-bottle-top" src="../assets/images/ink-bottle-1.png" alt="" />
          <img defer class="ink-bottle-darker" src="../assets/images/ink-bottle-1.png" alt="" />
          <img defer class="ink-bottle-darker" src="../assets/images/ink-bottle-1.png" alt="" />
        </div>
        <div class="subtext">Poetry</div>
      </div>

      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.bootstrap-home {
  min-height: 100vh;
  min-width: 100vw;
  background-image: url('https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?q=80&w=2203&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-color: black;

  .items {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
}

h1,
div {
  color: $secondary-darkest;
}

.catch-line {
  color: $primary-darker;
  font-style: italics;
}

main.bg {
  background-color: whitesmoke;
  color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
}

.bg-image {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  z-index: 0;
  img {
    // margin-top: 15vh;
    margin-left: 7vh;
    object-fit: cover;
    object-position: left 50%;
    width: 100%;
    height: 100%;
    right: 0;
  }
}

.poetry {
  color: black;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 24px;

  column-gap: 0;
  display: block;
  padding: 0;
  position: relative;
  .ink-bottle {
    z-index: 10;
    display: flex;
    cursor: pointer;
    rotate: 90deg;
    margin-left: -5vh;

    img {
      width: 25vh;
    }

    .ink-bottle-darker {
      position: absolute;
    }
  }
}

// -- Mobile Styles
@media (max-width: 1024px) {
  .catch-line {
    max-width: 55vw;
    text-wrap: wrap;
  }
}
</style>
