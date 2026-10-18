<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import SecretBook from '@/svgs/SecretBook.vue'
import GoogleSignIn from './GoogleSignIn.vue'
import { ref } from 'vue'
import useFirestore from '@/stores/firestore'
import Edit from './EditButton.vue'
import { CalendarRangeIcon, ScrollTextIcon } from '@lucide/vue'

const isBookHovered = ref(false)
const isOpen = ref(false)
function closeDialog() {
  isOpen.value = false
}

const { isAdmin } = useFirestore()
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <div class="header">
      <div></div>

      <div class="flex gap-2 justify-center items-end">
        <Edit v-if="isAdmin" />
        <RouterLink v-if="$route.name !== 'linktree'" :to="{ name: 'linktree' }" class="icon">
          <ScrollTextIcon class="icon-svg" />
        </RouterLink>
        <RouterLink
          v-if="isAdmin && $route.name !== 'events-list'"
          :to="{ name: 'events-list' }"
          class="icon"
        >
          <CalendarRangeIcon class="icon-svg" />
        </RouterLink>
        <AlertDialogTrigger as-child>
          <button
            @mouseenter="() => (isBookHovered = true)"
            @mouseleave="() => (isBookHovered = false)"
          >
            <SecretBook :is-opened="isAdmin" :is-hovered="isBookHovered" class="icon" />
          </button>
        </AlertDialogTrigger>
      </div>
    </div>

    <AlertDialogContent @on-overlay-click="closeDialog">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Admin Login</AlertDialogTitle>
        <!-- <AlertDialogDescription class="text-center">Only for admins </AlertDialogDescription> -->
      </AlertDialogHeader>
      <!-- <div class="divider"></div> -->

      <AlertDialogFooter class="flex sm:flex-col items-center">
        <AlertDialogAction class="p-0 sm:p-0 bg-transparent"
          ><GoogleSignIn @on-logged-in="closeDialog"
        /></AlertDialogAction>
        <!-- <AlertDialogAction>Continue</AlertDialogAction> -->
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style lang="scss" scoped>
.divider {
  border-top: 1px solid #b1b1b1;
  width: 30%;
  justify-self: center;
  margin: 10px 0;
}
.header {
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
      width: 24px;
      height: 24px;
      margin: 0;
      transition: fill 0.175s ease-in;
    }
  }
}

.icon-svg {
  stroke: white;
  transition: stroke 0.1s ease-in;
  width: 24px;
  height: 24px;
  stroke-width: 1px;

  &:hover {
    stroke: $secondary;
  }
}
</style>
