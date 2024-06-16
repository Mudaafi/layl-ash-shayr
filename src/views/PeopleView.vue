<script setup lang="ts">
import { computed, ref } from 'vue'
import VueHorizontal from 'vue-horizontal'
import { convertDriveImgToLinkable } from '@/utils'
import { usePeopleStore, type Department } from '@/stores/config'

const peopleStore = usePeopleStore()
peopleStore.fetchCommittee()
peopleStore.fetchVolunteers()

const committee = computed(() => peopleStore.committeeStore)
const volunteers = computed(() => peopleStore.volunteerStore)

type PeopleGroup = 'committee' | 'volunteers' | 'poets' | 'everyone'
const subheaders: Array<PeopleGroup> = ['committee', 'volunteers', 'poets', 'everyone']

function getDeptColor(dept: string | Department) {
  console.log(dept)
  switch (dept.toLowerCase()) {
    // case 'marketing':
    //   return '#FFADAD'
    // case 'admin':
    //   return '#99ADF8'
    // case 'outreach':
    //   return '#FFD6A5'
    // case 'tech':
    //   return '#E4F1EE'
    default:
      return '#E6E6E6'
  }
}

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
  if (!Number.isNaN(newIndex)) {
    index.value = newIndex
    isScrolling.value = false
  }
}
function onPrev() {
  index.value -= 1
}

function isCommittee() {
  return currSelection.value === 'committee'
}

function isVolunteers() {
  return currSelection.value === 'volunteers'
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

  <div v-if="isCommittee() && committee.length > 0" class="scroller">
    <vue-horizontal
      :displacement="0.9"
      :button-between="false"
      @onPrev="onPrev"
      @scroll="onScroll"
      @scroll-debounce="onScrollEnd"
    >
      <div
        class="slide committee-member"
        v-for="member in committee"
        :id="member.alias"
        :key="member.alias"
      >
        <div class="left-spacer"></div>
        <div class="img-container">
          <img :src="convertDriveImgToLinkable(member.imageLink)" alt="picture of a comm member" />
        </div>
        <div class="right-spacer"></div>
      </div>
    </vue-horizontal>
  </div>

  <main class="people-view">
    <section v-if="isCommittee() && committee.length > 0" class="committee">
      <div class="committee-member">
        <div class="left fadeable" :class="isScrolling && 'faded'">
          <h1 class="name">{{ committee[index]?.alias }}</h1>
          <div class="info-group">
            <div class="info">{{ committee[index]?.name }}</div>
            <div class="info">{{ committee[index]?.role }}</div>
          </div>
        </div>
        <div class="img-spacer">
          <!-- <img crossorigin="anonymous" :src="committee[index].imageSrc" alt="picture of a person" /> -->
        </div>
        <div class="right fadeable" :class="isScrolling && 'faded'">
          <h3>Life Excerpt</h3>
          <div class="excerpt">{{ committee[index]?.quote }}</div>
        </div>
      </div>
    </section>

    <section v-if="isVolunteers()" class="volunteers">
      <div class="member" v-for="volunteer in volunteers" :key="volunteer.name">
        <div class="left">
          <div class="pfp" :style="{ boxShadow: `4px 4px ${getDeptColor(volunteer.department)}` }">
            <img
              class="pfp-image"
              :src="convertDriveImgToLinkable(volunteer.imageLink)"
              alt="Picture of volunteer"
            />
          </div>
        </div>
        <div class="right">
          <div class="vol-name">{{ volunteer.name }}</div>
          <div class="vol-dept">{{ volunteer.department }}</div>
          <div class="vol-bio">
            <i>{{ volunteer.quote }}</i>
          </div>
        </div>
      </div>
    </section>

    <section v-if="['committee', 'volunteers'].indexOf(currSelection) === -1">
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

.scroller {
  position: absolute;
  overflow: hidden;
  .slide {
    width: 100%;
  }
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

.committee-member {
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

.volunteers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 80px;
  row-gap: 60px;
  justify-content: center;
  margin-top: 60px;
  min-width: 100vw;

  .member {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    .left {
      $pfp-width: 125px;
      .shader {
        position: absolute;
        width: $pfp-width;
        height: $pfp-width;
        border-radius: 100%;
        margin: 2px 0 0 2px;
      }
      .pfp {
        display: block;
        width: $pfp-width;
        aspect-ratio: 1;
        border-radius: 100%;
        overflow: hidden;
        .pfp-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% top;
        }
      }
    }
    .right {
      text-align: left;
      min-width: 300px;
      max-width: 300px;
      .vol-name {
        font-size: 24px;
        font-weight: 600;
      }
      .bio {
        text-decoration: it;
      }
    }
  }
}
</style>
