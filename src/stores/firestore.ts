import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfigs: FirebaseOptions = {
  projectId: 'laylashshayr'
}

export default function useFiretore(customConfigs: FirebaseOptions = {}) {
  const app = initializeApp({ ...firebaseConfigs, ...customConfigs })
  const firestore = getFirestore(app, 'laylashshayr')

  return {
    app,
    firestore
  }
}
