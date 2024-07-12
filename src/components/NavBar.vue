<script setup lang="ts">
import { ref } from 'vue'
import InstagramLink from '../svgs/InstagramLink.vue'
import TelegramLink from '../svgs/TelegramLink.vue'
import LASLogo from './LASLogo.vue'

const menuOpen = ref(false)
</script>

<template>
  <nav class="is-desktop">
    <div class="left">
      <RouterLink class="icon" to="/">
        <LASLogo width="80px" class="logo" />
      </RouterLink>
    </div>

    <div class="center">
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/people">People</RouterLink>
      <RouterLink to="/sessions">Sessions</RouterLink>
      <RouterLink to="/anthology">Anthology</RouterLink>
    </div>

    <div class="right">
      <a href="https://www.instagram.com/laylashshayr/" target="_blank" alt="Link to Instgram">
        <InstagramLink class="soc-med" />
      </a>

      <a href="https://t.me/+PDR99nolQd5lZmY1" target="_blank" alt="Link to Instgram">
        <TelegramLink class="soc-med" />
      </a>
    </div>
  </nav>

  <div class="mobile-nav-spacer is-mobile"></div>

  <nav class="is-mobile">
    <nav class="row navbar">
      <button class="hamburger" type="button" @click="menuOpen = !menuOpen">
        <span class="hamburger__line"></span>
        <span class="hamburger__middle"></span>
        <span class="icon-bar hamburger__line"></span>
      </button>
    </nav>
  </nav>

  <div class="dropdown is-mobile" :class="{ 'dropdown-after': menuOpen }">
    <ul class="navlist">
      <li class="navlistitem">
        <RouterLink to="/about">About</RouterLink>
      </li>
      <li class="navlistitem">
        <RouterLink to="/people">People</RouterLink>
      </li>
      <li class="navlistitem">
        <RouterLink to="/sessions">Sessions</RouterLink>
      </li>
      <li class="navlistitem">
        <RouterLink to="/anthology">Anthology</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.icon:hover {
  background-color: none;
}

.is-desktop {
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
    align-items: center;
    justify-content: left;
    display: flex;

    .logo {
      width: 80px;
      aspect-ratio: 1;
    }
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
      aspect-ratio: 1;
    }
  }
}

.is-mobile {
  display: none;
}

@media (max-width: 1024px) {
  div.mobile-nav-spacer {
    height: 28px;
    width: 1px;
    display: block;
    position: relative;
  }

  .is-mobile {
    display: unset;
  }

  .is-desktop {
    display: none;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    margin-bottom: 20px;
  }

  .hamburger {
    width: 45px;
    height: 45px;
    background-color: transparent;
    border-radius: 4px;
    border-width: 0;
  }

  .hamburger:focus {
    outline: none;
    border: none;
  }

  .hamburger__line,
  .hamburger__middle {
    display: block;
    width: 30px;
    height: 2px;
    border-radius: 2px;
    background-color: #ffffff;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  .hamburger__middle {
    width: 20px;
    margin-left: 10px;
  }

  .dropdown {
    height: 0px;
    width: 50vw;
    background-color: $secondary-darker;
    transition: height 0.35s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    top: 0;
  }

  .dropdown-after {
    height: calc(100vh);
  }

  .navlist {
    list-style: none;
  }

  .navlistitem {
    text-transform: uppercase;
    text-align: center;
    padding: 20px;
  }

  .navlistitem a {
    color: $primary-text-emphasis;
    font-weight: 500;
  }
}
</style>
