<script setup lang="ts">
import useFiretore from '@/stores/firestore'
import { signInWithCredential, type UserCredential } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'
import { onMounted } from 'vue'

declare global {
  interface Window {
    google: typeof import('google-one-tap')
  }
}

const emit = defineEmits<{
  onLoggedIn: [UserCredential]
}>()

// Accept redirect prop (or just hardcode it in)
let initialized = false

async function onGoogleAuth(response: any) {
  // console.log('Encoded JWT ID token: ' + response.credential)

  // const responsePayload = decodeJWT(response.credential)

  // console.log('Decoded JWT ID token fields:')
  // console.log('  Full Name: ' + responsePayload.name)
  // console.log('  Given Name: ' + responsePayload.given_name)
  // console.log('  Family Name: ' + responsePayload.family_name)
  // console.log('  Unique ID: ' + responsePayload.sub)
  // console.log('  Profile image URL: ' + responsePayload.picture)
  // console.log('  Email: ' + responsePayload.email)
  // console.log('🚀 ~ onGoogleAuth ~ credential:', responsePayload)

  const { auth, app } = useFiretore()
  const googleCreds = GoogleAuthProvider.credential(response.credential)
  const user = await signInWithCredential(auth.value, googleCreds)

  emit('onLoggedIn', user)
}

const initSignIn = () => {
  const btnElem = document.getElementById('googleSignInBtn')
  if (!btnElem) return
  if (initialized) return

  window.google.accounts.id.initialize({
    client_id: '396637985943-ellr423lfd5j0krsad9phhta1t6go9cp.apps.googleusercontent.com',
    callback: onGoogleAuth,
    cancel_on_tap_outside: false
  })

  window.google.accounts.id.renderButton(btnElem, {
    type: 'standard',
    text: 'continue_with',
    theme: 'outline',
    size: 'large',
    width: 300
  })

  window.google.accounts.id.prompt()

  initialized = true
}

onMounted(() => {
  if (typeof window.google !== 'undefined' && !initialized) {
    initSignIn()
    initialized = true
  }
})
</script>

<template>
  <component is="script" src="https://accounts.google.com/gsi/client" @load="initSignIn" async />
  <div id="googleSignInBtn" />
</template>

<style scoped></style>
