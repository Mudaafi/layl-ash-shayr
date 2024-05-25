<script setup lang="ts">
import InstagramLink from '../svgs/InstagramLink.vue'
import TelegramLink from '../svgs/TelegramLink.vue'
</script>

<template>
  <nav>
    <div class="left">
      <img class="logo" src="../assets/images/logo.png" alt="LAS Logo" />
    </div>

    <div class="center">
      <RouterLink to="/about-us">About</RouterLink>
      <RouterLink to="/events">Events</RouterLink>
      <RouterLink to="/poetry">Poetry</RouterLink>
    </div>

    <div class="right">
      <a href="https://www.instagram.com/layl.ashshayr/" target="_blank" alt="Link to Instgram">
        <InstagramLink class="soc-med" />
      </a>

      <a href="https://t.me/+PDR99nolQd5lZmY1" target="_blank" alt="Link to Instgram">
        <TelegramLink class="soc-med" />
      </a>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.logo {
  width: 76px;
}
nav {
  width: 100vw;
  position: absolute;
  text-align: center;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;

  .center {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    flex-grow: 4;
    font-size: 1.8rem;
  }

  .left,
  .right {
    flex-grow: 1;
  }

  .left {
    text-align: left;
  }

  .right {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    text-align: right;
    column-gap: 12px;
    a:hover {
      background-color: unset;
      color: unset;
    }

    .soc-med {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
