<script setup lang="ts">
import MoonAndStars from '../svgs/MoonAndStars.vue'
</script>

<template>
  <main>
    <section class="prelude">
      <div class="header">
        <div class="left">
          <h2 class="subheader">HOLD UP</h2>
          <h1>What is Layl Ash-Shayr?</h1>
        </div>
        <div class="right">
          <MoonAndStars class="top-right-graphic" />
        </div>
      </div>

      <div class="content">
        <p>
          Layl Ash-Shayr, (loosely) translating to “Poetry Night”, is an
          <b>open mic and spoken word event for Muslim writers in Singapore </b> to share their work
          and engage with fellow creatives
        </p>
      </div>
    </section>

    <section class="concept">
      <div class="header">
        <h1>The Concept</h1>
        <h2 class="subheader">IT'S SIMPLE!</h2>
      </div>

      <div class="content">
        <div class="point">
          <div class="point-img"><MoonAndStars /></div>
          <div class="subheader">1 - 2 Featured Guests</div>
          <ul>
            <li>Hear from published Muslim authors/poets & their works</li>
            <li>Be inspired by prominent voices within our community!</li>
          </ul>
        </div>

        <div class="point">
          <div class="point-img"><MoonAndStars /></div>
          <div class="subheader">5 Open Mics</div>
          <ul>
            <li>Support emerging voices in the SG Muslim literary scene</li>
            <li>Sneak peek of new, unheard & possibly unpublished work!</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="okay-but">
      <div class="header">
        <h2 class="subheader">OKAY, BUT</h2>
        <h1>Why a 'Muslim' Open-Mic?</h1>
      </div>

      <div class="content">
        <div class="point">
          <div class="point-img"><MoonAndStars /></div>
          <p>To nurture a <b>love for reading and writing</b> in the local Muslim Community</p>
        </div>
        <div class="point">
          <div class="point-img"><MoonAndStars /></div>
          <p>To build a <b>community of Muslim writers</b> who can support one another</p>
        </div>
        <div class="point">
          <div class="point-img"><MoonAndStars /></div>
          <p>A platform for <b>up-and-coming Muslim writers</b> to showcase their work</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
div.subheader {
  margin-bottom: 8px;
}
.top-right-graphic {
  height: 48px;
  width: 48px;
  margin-right: -8px;
  @media (min-width: $desktop-width) {
    height: 8vw;
    width: 8vw;
  }
}

section {
  padding: 24px;
  @media (min-width: $desktop-width) {
    padding: 100px;
  }

  .point-img {
    margin-top: 48px;
    margin-bottom: 24px;
    @media (min-width: $desktop-width) {
      margin-top: 140px;
      margin-bottom: 60px;
    }
  }
  .header {
    margin-bottom: 24px;
    @media (min-width: $desktop-width) {
      margin-bottom: 60px;
    }
  }

  &.prelude {
    background-color: $bg;

    .header {
      display: flex;
      justify-content: space-between;
    }
    @media (min-width: $desktop-width) {
      .content {
        width: 50%;
      }
    }
  }

  &.concept {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: $primary-darker;
    .header {
      margin-bottom: 0;
    }
    @media (min-width: $desktop-width) {
      .content {
        display: flex;
        column-gap: 162px;
      }
    }
  }

  &.okay-but {
    background-color: $secondary-darkest;
    text-align: center;
    .header {
      text-align: right;
    }
    @media (min-width: $desktop-width) {
      .content {
        display: flex;
        column-gap: 120px;
      }
    }
  }
}
</style>
