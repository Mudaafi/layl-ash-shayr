<script setup lang="ts">
import { usePeopleStore } from '@/stores/people'
import { useSessionsStore } from '@/stores/sessions'
import { computed, ref } from 'vue'
import { convertDriveImgToLinkable } from '@/utils'
import NavDrop from '@/components/NavDrop.vue'

const { fetchPoets, getPoetByName } = usePeopleStore()
const { fetchSessions, getSessionsById, getSessionsByYear, getSessionConstellation } =
  useSessionsStore()

const props = defineProps<{
  year: string
}>()

const fixed = ref(false)
const selectedSessionId = ref(-1)
const sessionsForTheYear = computed(() => getSessionsByYear(parseInt(props.year)))
const nextSessionId = computed(() => {
  const upcomingSessions = sessionsForTheYear.value.filter(
    (session) => Date.now() < session?.date?.getTime()
  )

  return upcomingSessions[0].id || -1
})
const selectedSession = computed(() => getSessionsById(selectedSessionId.value))
const selectedConstellation = computed(() => getSessionConstellation(parseInt(props.year)))
const selectedExcerptArr = computed(() => selectedSession.value?.excerpt?.split('\n'))

function setFixed(bool: boolean) {
  fixed.value = bool
}

function onStarClick(e: MouseEvent, sessionId: number) {
  const constellationContainer = document.getElementById('constellation-container')
  const constellationBg = document.getElementById('constellation')
  if (!constellationContainer) {
    console.warn('Constellation Container not found')
    return
  }

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if (!fixed.value) {
    selectedSessionId.value = sessionId

    const mouseX = e.clientX
    const mouseY = e.clientY

    const deltaX = windowWidth / 2 - mouseX
    const deltaY = windowHeight / 2 - mouseY

    const postZoomDeltaY = -windowHeight * 0.3

    constellationContainer.style.transform = `translateY(${postZoomDeltaY}px) scale(3) translate(${deltaX}px, ${deltaY}px)`
    constellationBg!.style.opacity = '0.1'
  } else {
    selectedSessionId.value = -1

    constellationContainer.style.transform = `scale(1)`
    constellationBg!.style.opacity = ''
  }

  setFixed(!fixed.value)
}

function onMouseMove(e: MouseEvent) {
  if (fixed.value) return
  const { clientX: x, clientY: y } = e
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const bg: HTMLElement | null = document.querySelector('.space-bg')
  const posX = Math.floor((x * 100) / windowWidth)
  const posY = Math.floor((y * 100) / windowHeight)
  if (!bg) return
  bg.animate(
    {
      'background-position': `${posX}% ${posY}%`,
      backgroundPositionX: `${posX}%`,
      backgroundPositionY: `${posY}%`
    },
    { duration: 40000, fill: 'forwards' }
  )
}

function logMouseClick(e: MouseEvent) {
  const containerHeight = window.innerHeight / 2
  const containerWidth = containerHeight

  const mouseX = e.offsetX
  const mouseY = e.offsetY
  const posX = Math.floor((mouseX * 100) / containerWidth)
  const posY = Math.floor((mouseY * 100) / containerHeight)

  console.log(`clicked x:${posX - 4}% y:${posY - 5}%`)
}

function getStarClass(sessionId: number) {
  if (selectedSessionId.value !== -1 && selectedSessionId.value !== sessionId) {
    return 'not-selected'
  } else if (sessionId === nextSessionId.value) {
    return 'next'
  }
}

// Executions
fetchSessions()
fetchPoets()

window.addEventListener('mousemove', onMouseMove)

const isMobileWidth = window.matchMedia('(max-width: 1024px)').matches
</script>

<template>
  <NavDrop />
  <div class="space-bg"></div>

  <div class="content-container" @click="logMouseClick">
    <div class="constellation-container" id="constellation-container">
      <img
        class="constellation"
        id="constellation"
        :src="selectedConstellation"
        alt="constellation-pics"
      />
      <div class="stars-container">
        <img
          v-for="session in sessionsForTheYear"
          :key="new Date(session.date).toISOString()"
          class="star"
          :class="getStarClass(session.id)"
          src="../assets/images/star-candidate-1.png"
          @click="(e) => onStarClick(e, session.id)"
          alt="session-icon"
          :style="{
            color: 'red',
            top: `${!isMobileWidth ? session.y_pos : session.y_pos - 5}%`,
            left: `${!isMobileWidth ? session.x_pos : session.x_pos - 5}%`
          }"
        />
      </div>
    </div>

    <div class="info" :class="selectedSessionId !== -1 && 'active'">
      <div class="session-title">
        {{ selectedSession?.sessionTitle || selectedSession?.sessionType }}
        <span class="session-number">#{{ selectedSessionId }}</span>
      </div>
      <div
        class="session-featured"
        v-if="selectedSession?.featuredSpeakers && selectedSession?.featuredSpeakers.length > 0"
      >
        ft. {{ selectedSession?.featuredSpeakers.join(' & ') }}
      </div>
      <div class="session-date">
        -
        {{
          selectedSession?.date.toLocaleString('default', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
        }}
      </div>

      <section class="featured">
        <div
          class="featured-speaker"
          v-for="speaker in selectedSession?.featuredSpeakers"
          :key="speaker"
        >
          <div class="pfp">
            <img :src="convertDriveImgToLinkable(getPoetByName(speaker)?.imageLink || '')" alt="" />
          </div>
          <div class="bio">
            {{ getPoetByName(speaker)?.quote }}
          </div>
        </div>
      </section>
      <section class="open-mics" v-if="selectedSession?.sessionType === 'OPEN_MIC'">
        <div class="container" v-if="selectedSession?.poets.length > 0">
          <h2>Open Mic Lineup</h2>
          <ul class="open-mics-list">
            <li class="poet" v-for="openMicers in selectedSession?.poets" :key="openMicers">
              {{ openMicers }}
            </li>
          </ul>
        </div>
        <div class="sign-up-btn" v-else>
          <a :href="selectedSession.signUpLink" target="_blank"> Register Today! </a>
        </div>
      </section>

      <section class="other-excerpt" v-if="selectedSession?.sessionType !== 'OPEN_MIC'">
        <p class="excerpt-para" v-for="(p, i) in selectedExcerptArr" :key="i">{{ p }}</p>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-up-btn {
  cursor: pointer;
  border: 1px solid $primary;
  padding: 10px 14px;
  border-radius: 8px;
  transition: all 0.15s ease-in;
  text-align: center;

  &:hover {
    background-color: $secondary;
    border: 1px solid $primary-darker;
    color: $primary-darker;
    a {
      color: black;
    }
  }
}

.space-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('../assets/images/constellation-bg.png') no-repeat center center fixed;
  -webkit-background-size: 150%;
  -moz-background-size: 150%;
  -o-background-size: 150%;
  background-position: 50% 50%;
  overflow: hidden;
}

.content-container {
  min-height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  min-width: 100vw;
  overflow-x: hidden;

  position: relative;
  .constellation-container {
    $constellation-height: 50vh;
    transition: transform 0.55s cubic-bezier(0.56, 0.08, 0.38, 1.01);
    display: flex;
    position: absolute;
    left: 50%;
    right: 50%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    .constellation {
      opacity: 65%;
      height: $constellation-height;
      position: absolute;
      transition: opacity 0.25s ease;
    }

    .stars-container {
      min-width: $constellation-height;
      min-height: $constellation-height;
      width: $constellation-height;
      height: $constellation-height;
      max-width: $constellation-height;
      max-height: $constellation-height;
      position: relative;
    }
    .star {
      width: 70px;
      aspect-ratio: 1;
      z-index: 3;
      cursor: pointer;
      position: absolute;

      &.not-selected {
        opacity: 25%;
      }

      &.selected {
      }
      &.completed {
      }
      &.upcoming {
        opacity: 75%;
      }
      &.next {
        animation: pulse 0.5s linear infinite;
      }

      @keyframes starActive {
        0% {
          transform: rotate(0);
        }

        50% {
          transform: rotate(0);
        }
        51% {
          transform: rotate(45deg);
        }
        100% {
          transform: rotate(45deg);
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        90% {
          transform: scale(0.75);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }

  .info {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 35%;
    opacity: 0;
    display: none;
    font-size: 16px;

    &.active {
      animation: infoActive 1s ease-in forwards;
      display: block;
      opacity: 1;
      // transition: opacity 1s ease-in;
    }

    @keyframes infoActive {
      0% {
        display: block;
        opacity: 0;
      }

      100% {
        opacity: 1;
        display: block;
      }
    }

    .session-title {
      font-size: 48px;
      font-weight: 600px;
      font-family: 'Pinyon Script', cursive;
      line-height: 60px;
    }

    .session-featured {
      font-style: italic;
    }

    .session-date {
      margin-bottom: 20px;
    }

    .featured {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      margin-bottom: 20px;

      .featured-speaker {
        display: grid;
        grid-template-columns: 1fr 4fr;
        column-gap: 14px;
        .pfp {
          display: block;
          width: 150px;
          aspect-ratio: 1;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% top;
          }
        }
        .bio {
          text-align: left;
        }
      }
    }

    .open-mics {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: left;

      .container {
        width: 15vw;
        text-align: center;

        h2 {
          text-decoration: underline 1px;
        }

        .open-mics-list {
          list-style: none;
          .poet {
            font-size: 18px;
          }
        }
      }
    }

    .other-excerpt {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      text-align: justify;
    }
  }
}

// -- MOBILE Overrides

@media (max-width: 1024px) {
  .is-mobile {
    display: flex !important;
  }

  .space-bg {
    background-size: cover;
  }

  .content-container .info {
    top: 35%;
    padding-bottom: 48px;
    .featured {
      .featured-speaker {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 18px;

        .pfp {
          width: 75vw;
        }
      }
    }

    .open-mics {
      justify-content: center;
      text-align: center;
      .container {
        width: 50vw;
        text-align: left;
      }
    }
  }
}
</style>
