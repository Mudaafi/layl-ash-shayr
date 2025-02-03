<script setup lang="ts">
import { ref } from 'vue'
import LASLogo from './LASLogo.vue'

const menuOpen = ref(false)
const isMobileWidth = window.matchMedia('(max-width: 1024px)').matches
</script>

<template>
  <nav class="row navbar" @click="menuOpen = !menuOpen">
    <LASLogo :width="!isMobileWidth ? '66px' : '48px'" />
  </nav>

  <div class="dropdown" :class="{ 'dropdown-after': menuOpen }">
    <ul class="navlist">
      <li class="navlistitem">
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li class="navlistitem">
        <RouterLink to="/about">About</RouterLink>
      </li>
      <li class="navlistitem">
        <RouterLink to="/people">People</RouterLink>
      </li>
      <li class="navlistitem">
        <RouterLink to="/sessions/2024">Sessions</RouterLink>
      </li>
      <li class="navlistitem">
        <RouterLink to="/anthology">Anthology</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  padding: 12px;
  cursor: pointer;
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
  background-color: $secondary-darker;
  transition: height 0.35s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 18;
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

@media (max-width: 1024px) {
  .navbar {
    padding: 6px;
  }
}
</style>
