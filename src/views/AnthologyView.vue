<script setup lang="ts">
import { computed, ref } from 'vue'
import SecretBook from '../svgs/SecretBook.vue'
import { useAuthStore } from '@/stores/auth'
import NavDrop from '../components/NavDrop.vue'
import LASLogo from '@/components/LASLogo.vue'

const authStore = useAuthStore()
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

const praiseIndex = ref(0)

function login() {
  const magicWord = window.prompt('Recite the magic word', '')
  if (magicWord) {
    authStore.setPassword(magicWord)
  }
}

const praises = [
  {
    praise: `Reading <i>Layl Ash-Shayr Vol. I: The Opening Act</i> feels like immersing myself in one of their electrifying open mic nights, with every word meticulously curated. This anthology weaves an intimate tapestry of emotions, threaded with faith, resilience, and profound human experiences.
\nEach poem flows naturally, like moonlight illuminating the night, serene and radiant, casting quiet hope over the darkness. The collection captures the essence of beginnings, introspective journeys, and universal truths often left unspoken. Poems connect like <i>A Lump in the Throat</i> to <i>The Garden</i> of our thoughts, weaving <i>Gratitude Practice</i> into our lives, and highlighting the <i>Barriers of Humanity</i> we all face. This anthology sings a <i>Swan Song</i> that echoes well beyond the final curtain call.
\nResonating with deep personal reflection and communal introspection, each piece makes us feel seen and understood. This collection celebrates the vibrant spirit and diverse voices of our community, inviting us into a sacred space where words become vessels of light and love. Guiding us through life's trials and triumphs, this anthology stands as a beacon of the flourishing Singapore Muslim literary community, leaving an indelible mark on our hearts.
`,
    by: '— Fadhli Fadzil, author of <i>Di Sebalik Jendela (2020)</i> and <i>Kulihat Layu dalam Melayu</i> (2023)'
  },

  {
    praise:
      "True to its genesis as an open mic, this book samples voices at turns brimming with devotional intensity and plainspokenness. It's exciting to see so many names new to me, and I look forward to the editors making good on their promise that this is just the opening act.",
    by: '— Hao Guang, author of <i>Deeds of Light</i> (2015) and <i>The International Left-Hand Calligraphy Association</i> (2023)'
  },

  {
    praise: `The Opening Act is an important anthology, the first wave of a rising tide of Malay-Muslim artists, writers, poets and thinkers exploring the relationship between the self, community, spirituality, religion, and God, within the context of 21st century Singapore and, in several cases, beyond. Against the backdrop of social media noise, cultural wars and whatever it is Mediacorp artistes and so-called influencers are peddling, The Opening Act is refreshing, brave and a defiant celebration of the truly necessary, in a world that often celebrates the wrong people and the wrong things.
\nHere you'll find confessional poetry, lyrical spoken word verses, expansive thought experiments and more, all in the service of speaking beatific truths that are hardly given a platform in Singapore. Explore the profound metaphors of Kaif's Fid Dunya Wal, take an emotional multi-national adventure in Noor Iskandar's sprawling head and heart space in the moving A Lump In The Throat or revel in life's joyous uncertainties in Ameera Aslam's beautiful Unexpected. Its an enjoyable read at the very least, but it's also a good entry to the people whose voices are powerful reflections of the Malay/Muslim/Malay-Muslim truths`,
    by: '— Suffian Hakim, author of <i>Harris bin Potter and The Stoned Philosopher</i> (2015), <i>The Minorities</i> (2017) and <i>The Keepers of Stories</i> (2021)'
  },

  {
    praise:
      'May this book be a glowing testament to a thriving and unashamedly Muslim scene in poetry-writing Singapore. The editors Laili, Zu and Sarah have worked tirelessly to give a platform to so many eager voices, and this beautiful anthology is proof that with enough passion, zeal and generosity of spirit, the possibilities are quite simply endless.',
    by: '– Daryl Qilin Yam, co-founder of Sing Lit Station and author of <i>Be Your Own Bae</i> (2024), <i>Shantih Shantih Shantih</i> (2021), <i>Lovelier, Lonelier</i> (2021) and <i>Kappa Quartet</i> (2016)'
  }
]
// function getPraise(i: number) {
//   return praises[i]
// }

// const praise = computed(() => getPraise(0))

setInterval(() => {
  const timeNow = Date.now()
  timeLeft.value = launchTime - timeNow
}, 1000)

setInterval(() => {
  if (praiseIndex.value === praises.length - 1) {
    praiseIndex.value = 0
  } else {
    praiseIndex.value += 1
  }
}, 15000)
const isMobileWidth = window.matchMedia('(max-width: 1024px)').matches
</script>

<template>
  <main class="bg">
    <NavDrop v-if="hasLaunched || authStore.isAdmin" />
    <div class="login-header">
      <div></div>
      <button @click="login"><SecretBook class="icon" /></button>
    </div>

    <div class="countdown" v-if="!hasLaunched && !authStore.isAdmin">
      <LASLogo :width="isMobileWidth ? '65px' : '140px'" class="logo" />
      <div class="title">Layl Ash-Shayr Vol 1</div>
      <div class="clock">
        {{ timeObj.days }}d {{ timeObj.hours }}h {{ timeObj.minutes }}m {{ timeObj.seconds }}s
      </div>
      <div class="subtitle">Coming Soon</div>
    </div>

    <div v-else class="reveal">
      <!-- <div class="title-header">Layl Ash-Shayr Vol. 1</div>
    <div class="title">The Opening Act</div>
    <div class="subtext">An Anthology by LAS</div> -->
      <section class="image">
        <div class="antho-front">
          <img src="../assets/images/antho-front.png" alt="anthology front cover" />
          <div class="order-btn">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSec-zjj84JYClykRAw1Z6yY5OHahZqaREwnj8l3Reh-ebw3cw/viewform"
            >
              Get Your Copy (virtual)
            </a>
          </div>
        </div>
      </section>

      <section class="anthology">
        <p class="description">
          In this inaugural anthology, local Muslim writers explore moments of discovery,
          contemplation, stillness, and even chaos. Get comfortable in your box seat as the curtains
          part and transport you to experience life's many turns in various scenes on stage.
        </p>
      </section>

      <section class="praises">
        <div class="title">Praises for The Opening Act</div>

        <div class="praise-grid">
          <div v-for="praise in praises" :key="praise.by" class="praise-group">
            <div class="quotes start">“</div>
            <p
              class="praise-para"
              v-for="(p, i) in praise.praise.split('\n')"
              :key="i"
              v-html="p"
            ></p>
            <div class="quotes end">”</div>

            <div class="by" v-html="praise.by"></div>
          </div>
        </div>
      </section>

      <section class="order">
        <div class="order-btn">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSec-zjj84JYClykRAw1Z6yY5OHahZqaREwnj8l3Reh-ebw3cw/viewform"
          >
            Get Your Copy (virtual)
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.bg {
  background: url('https://images.unsplash.com/photo-1609645778471-613f21fcf3df?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-position: 50% 50%;
  background-size: cover;
}

.login-header {
  display: flex;
  position: absolute;
  top: 0;
  padding: 14px;
  left: 0;
  width: 100%;

  justify-content: space-between;

  button {
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    .icon {
      width: 32px;
      margin: 0;
      fill: #fff;
      transition: fill 0.175s ease-in;
      &:hover {
        fill: $secondary;
      }
    }
  }
}

.countdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .title {
    font-family: 'Volkorn';
    font-size: 4vw;
  }

  .clock {
    color: white;
    font-size: 10vw;
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

.reveal {
  padding: 0 14vw 4vw;

  .image {
    display: flex;
    justify-content: center;
  }
  .antho-front {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 35vw;

    img {
      width: 35vw;
    }
  }

  .anthology {
    padding: 3vw;
    .description {
      font-size: 18px;
    }
  }

  .praises {
    .title {
      font-weight: 700;
      font-size: 32px;
      margin-bottom: 30px;
    }
    display: flex;
    flex-direction: column;

    .praise-grid {
      padding: 0 40px;
      .praise-group {
        margin-bottom: 40px;
        padding: 32px;
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.11);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5.9px);
        -webkit-backdrop-filter: blur(5.9px);
        border: 1px solid rgba(255, 255, 255, 0.13);
      }
      .praise-para {
        color: #fff;
        margin-bottom: 10px;
        font-size: 18px;
        text-align: justify;
        color: $primary-text;
        &:last-of-type {
          margin-bottom: 10px;
        }
      }
      .quotes {
        font-size: 40px;
        line-height: 40px;

        &.end {
          text-align: right;
          line-height: 20px;
        }
      }
      .by {
        text-align: right;
        width: 100%;
        color: $primary-text-emphasis;
      }
    }
    margin-bottom: 40px;
  }

  .order-btn {
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

  .order {
    display: flex;
    justify-content: center;
  }
}

// .pdf-viewer {
//   height: 90vh;
//   aspect-ratio: 1;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

// -- Mobile Styles {
@media (max-width: 1024px) {
  .logo {
    margin-bottom: 8px;
  }
  .countdown {
    .subtitle {
      font-size: 2.5vw;
    }
  }

  .reveal {
    padding: 3vw;

    .antho-front {
      width: 85vw;
      img {
        width: 85vw;
      }
    }

    .praises {
      margin-bottom: 40px;
      .title {
        font-size: 22px;
      }

      .praise-grid {
        padding: 0 12px;
        .praise-group {
          padding: 20px;

          margin-bottom: 60px;
        }
        .praise-para {
          margin-bottom: 20px;
          font-size: 16px;
        }
        .quotes {
          font-size: 30px;
          line-height: 30px;
        }
      }
    }

    .anthology {
      padding: 3vw;
      .description {
        font-size: 20px;
      }
    }
  }
}
</style>
