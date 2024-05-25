<script setup lang="ts">
import { ref } from 'vue'
import VueHorizontal from 'vue-horizontal'

type PeopleGroup = 'committee' | 'volunteers' | 'poets' | 'everyone'
const subheaders: Array<PeopleGroup> = ['committee', 'volunteers', 'poets', 'everyone']

const committee = [
  {
    left: {
      alias: 'lails',
      name: `Laili`,
      role: 'The Outreach Head',
      birthday: '???'
    },
    imageSrc: 'https://drive.lienuc.com/uc?id=1cJBZVgiAEhSkQMTfqFaeXrskeBDLj6mL',
    right: {
      excerpt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit nesciunt. Officiis
          saepe excepturi provident, blanditiis commodi nisi distinctio, quod aspernatur voluptate
          soluta ullam? Cumque omnis incidunt fugit facilis, ab nulla modi eius qui nihil, et animi
          ipsum, facere consequatur libero quae laudantium impedit totam distinctio porro deserunt
          voluptate architecto.`
    }
  },
  {
    left: {
      alias: 'zubs',
      name: `Zubaidah Dadlani`,
      role: 'The Marketing Head',
      birthday: '???'
    },
    imageSrc: 'https://drive.lienuc.com/uc?id=1p-ekiTD7RChF28uaHzAytc9IIixgFG6M',
    right: {
      excerpt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit nesciunt. Officiis
          saepe excepturi provident, blanditiis commodi nisi distinctio, quod aspernatur voluptate
          soluta ullam? Cumque omnis incidunt fugit facilis, ab nulla modi eius qui nihil, et animi
          ipsum, facere consequatur libero quae laudantium impedit totam distinctio porro deserunt
          voluptate architecto.`
    }
  },
  {
    left: {
      alias: 'sarah',
      name: `Sarah`,
      role: 'The Admin Head',
      birthday: '???'
    },
    imageSrc: 'https://drive.lienuc.com/uc?id=1Kbn-8rpYz893a7W9jcFuEwIqhgyc5Yth',
    right: {
      excerpt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit nesciunt. Officiis
          saepe excepturi provident, blanditiis commodi nisi distinctio, quod aspernatur voluptate
          soluta ullam? Cumque omnis incidunt fugit facilis, ab nulla modi eius qui nihil, et animi
          ipsum, facere consequatur libero quae laudantium impedit totam distinctio porro deserunt
          voluptate architecto.`
    }
  },
  {
    left: {
      alias: 'thas',
      name: `Thasneem`,
      role: 'Photographer',
      birthday: '???'
    },
    imageSrc: 'https://drive.lienuc.com/uc?id=1ILnysEylHmnt8MBNCb715N_9hTfEi-1D',
    right: {
      excerpt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit nesciunt. Officiis
          saepe excepturi provident, blanditiis commodi nisi distinctio, quod aspernatur voluptate
          soluta ullam? Cumque omnis incidunt fugit facilis, ab nulla modi eius qui nihil, et animi
          ipsum, facere consequatur libero quae laudantium impedit totam distinctio porro deserunt
          voluptate architecto.`
    }
  },
  {
    left: {
      alias: 'aafi',
      name: `Ahmad Mudaafi'`,
      role: 'Tech Dude',
      birthday: '19 Sep 1997'
    },
    imageSrc: 'https://drive.lienuc.com/uc?id=1aGzcBNnPJ1XJBvKP6JyGHB9yR4N7zqpZ',
    right: {
      excerpt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit nesciunt. Officiis
          saepe excepturi provident, blanditiis commodi nisi distinctio, quod aspernatur voluptate
          soluta ullam? Cumque omnis incidunt fugit facilis, ab nulla modi eius qui nihil, et animi
          ipsum, facere consequatur libero quae laudantium impedit totam distinctio porro deserunt
          voluptate architecto.`
    }
  }
]

const currSelection = ref<PeopleGroup>('committee')
function onPeopleGroupSelect(val: PeopleGroup) {
  currSelection.value = val
}

const isScrolling = ref(false)
function onScroll() {
  isScrolling.value = true
}

const index = ref(0)
function onScrollEnd(e: any) {
  const newIndex = Math.floor(e.left / e.width)
  index.value = newIndex
  isScrolling.value = false
}
function onPrev() {
  index.value -= 1
}

function isCommittee() {
  return currSelection.value === 'committee'
}
</script>

<template>
  <div class="sub-headers">
    <a
      v-for="subheader in subheaders"
      :key="subheader"
      :onClick="() => onPeopleGroupSelect(subheader)"
      class="people-group"
      :class="currSelection === subheader && 'selected'"
    >
      {{ subheader }}
    </a>
  </div>

  <div v-if="isCommittee()" class="scroller">
    <vue-horizontal
      :displacement="0.9"
      :button-between="false"
      @onPrev="onPrev"
      @scroll="onScroll"
      @scroll-debounce="onScrollEnd"
    >
      <div
        class="slide member"
        v-for="member in committee"
        :id="member.left.alias"
        :key="member.left.alias"
      >
        <div class="left-spacer"></div>
        <div class="img-container">
          <img crossorigin="anonymous" :src="member.imageSrc" alt="picture of a comm member" />
        </div>
        <div class="right-spacer"></div>
      </div>
    </vue-horizontal>
  </div>

  <main class="people-view">
    <section v-if="isCommittee()" class="committee">
      <div class="member">
        <div class="left fadeable" :class="isScrolling && 'faded'">
          <h1 class="name">{{ committee[index].left.alias }}</h1>
          <div class="info-group">
            <div class="info">{{ committee[index].left.name }}</div>
            <div class="info">{{ committee[index].left.role }}</div>
            <div class="info">{{ committee[index].left.birthday }}</div>
          </div>
        </div>
        <div class="img-spacer">
          <!-- <img crossorigin="anonymous" :src="committee[index].imageSrc" alt="picture of a person" /> -->
        </div>
        <div class="right fadeable" :class="isScrolling && 'faded'">
          <h3>Life Excerpt</h3>
          <div class="excerpt">{{ committee[index].right.excerpt }}</div>
        </div>
      </div>
    </section>

    <section v-if="!isCommittee()">
      <h1>Coming soon!</h1>
    </section>
  </main>
</template>

<style scoped lang="scss">
$sub-header-height: 40px;

.fadeable {
  transition: opacity 0.35s ease-out;
}

.faded {
  opacity: 0;
}

.sub-headers {
  width: 100%;
  height: $sub-header-height;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.people-group {
  margin: 0 10px;
  cursor: pointer;
  color: $primary-text;

  &.selected {
    color: $secondary;
    text-decoration: underline;
  }
}

.member {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  flex-direction: row;
  column-gap: 40px;
  padding: 40px;
  padding-top: 0;
  padding-bottom: 0;

  .left,
  .left-spacer {
    text-align: left;
    padding-top: 40px;
    padding-right: 0;

    .name {
      color: $secondary;
      font-family: Arima;
      font-size: 10vw;
      letter-spacing: 4px;
      margin-bottom: 20px;
    }

    .info {
      margin-bottom: 8px;
      font-size: 1.25vw;
    }
  }

  .img-container,
  .img-spacer {
    width: 100%;
    height: calc(100vh - $sub-header-height - 8px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% top;
    }
  }

  .right,
  .right-spacer {
    padding-top: 40px;
    text-align: left;
    h3 {
      font-weight: 700;
      font-size: 1.25vw;
      margin-bottom: 20px;
    }
  }
}

.scroller {
  position: absolute;
  overflow: hidden;
  .slide {
    width: 100%;
  }
}
</style>
