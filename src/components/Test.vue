<script setup lang="ts">
import useFiretore from '@/stores/firestore'
import Button from './ui/button/Button.vue'

const { app, firestore, auth } = useFiretore()

async function onClick() {
  console.log('test')
  const currentUser = auth.value.currentUser
  console.log('🚀 ~ onClick ~ currentUser:', currentUser)
  console.log(currentUser?.toJSON())
  console.log(await currentUser?.getIdTokenResult())
}
</script>

<template>
  <Button class="cursor-pointer" @click="onClick">Click me!</Button>
</template>

<style lang="scss" scoped></style>
