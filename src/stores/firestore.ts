import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { computed, reactive } from 'vue'

const firebaseConfigs: FirebaseOptions = {
  projectId: 'laylashshayr'
}

export default function useFiretore(customConfigs: FirebaseOptions = {}) {
  const firestoreApp = initializeApp({
    // https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
    apiKey: 'AIzaSyDEW7HmfztR75Roji1_tVpflN1-Rd3rL7Y',
    ...firebaseConfigs,
    ...customConfigs
  })
  const app = reactive(firestoreApp)

  const firestore = computed(() => {
    return getFirestore(app, 'laylashshayr')
  })

  const auth = computed(() => {
    return getAuth(app)
  })

  return {
    app,
    firestore,
    auth
  }
}
