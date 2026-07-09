import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { computed, reactive, ref } from 'vue'

const firebaseConfigs: FirebaseOptions = {
  projectId: 'laylashshayr'
}

const firestoreApp = initializeApp({
  // https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
  apiKey: 'AIzaSyDEW7HmfztR75Roji1_tVpflN1-Rd3rL7Y',
  ...firebaseConfigs
})
const app = reactive(firestoreApp)
const isAdmin = ref(false)

const firestore = computed(() => {
  return getFirestore(app, 'laylashshayr')
})

const auth = computed(() => {
  return getAuth(app)
})

onAuthStateChanged(auth.value, async () => {
  const currentIdTokenResult = await auth.value.currentUser?.getIdTokenResult()
  isAdmin.value = currentIdTokenResult?.claims?.admin === true
})

export default function useFiretore() {
  return {
    app,
    firestore,
    auth,
    isAdmin
  }
}
