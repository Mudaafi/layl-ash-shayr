import { useStorage } from '@vueuse/core'
import useFiretore from './firestore'
import {
  doc,
  getDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type FirestoreDataConverter,
  setDoc,
  runTransaction
} from 'firebase/firestore/lite'
import { onSnapshot, doc as document, getFirestore } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

/**
 * Because we need auth to allow for writes, google macros won't cut it.
 * We'll use Firestore instead, with read-all and write-authed permissions.
 *
 * Firestore should be client-side, to reduce auth complexity.
 *
 * Probably should define a ttl to prevent spams. I wonder if we'll need a ddos protector :think:
 * Surely firestore has it's own ddos protection right...? Altho I guess if their customers get surged on that's better for them
 *
 * TODO: debounce based on last tll (5mins) + cache
 */

export default function useLinktree() {
  const { firestore, isAdmin } = useFiretore()
  const documentPath = doc(firestore.value, 'website', 'linktree').withConverter(linktreeConverter)
  const links = useStorage<Array<LinkTreeItem>>('linktree-links', [], sessionStorage)
  const subtitles = useStorage<Array<string>>('linktree-subtitles', [], sessionStorage)
  const socialMedia = useStorage<Array<SocialMediaItem>>('linktree-socialMedia', [], sessionStorage)
  const userPosition = useStorage<number>('linktree-user-position', -1, localStorage)
  const userCount = ref(-1)
  const isLoading = computed(() => links.value.length === 0)

  async function fetchLinktree() {
    const document = await getDoc(documentPath)
    const fetchedConfigs = document.data()

    links.value = fetchedConfigs?.links || links.value
    subtitles.value = fetchedConfigs?.subtitles || subtitles.value
    socialMedia.value = fetchedConfigs?.socialMedia || socialMedia.value
  }

  // Define a ttl here to prevent spams
  if (links.value.length === 0) {
    fetchLinktree()
  }

  async function updateLinktree() {
    if (!isAdmin) {
      alert("Now now, you aren't an admin mister")
    }

    toast.promise(
      setDoc(documentPath, {
        links: links.value,
        socialMedia: socialMedia.value,
        subtitles: subtitles.value
      }),
      {
        loading: 'Updating configs...',
        success: () => 'Linktree updated ✅',
        error: (reason: any) => toast.error(`❌ Looks like something went wrong: ${reason}`)
      }
    )
  }

  const db = getFirestore(firestore.value.app, 'laylashshayr')
  onSnapshot(
    document(db, 'website', 'linktree', 'metadata', 'userCount'),
    (snap) => (userCount.value = snap.data()?.count)
  )

  console.log(userPosition.value)
  if (!userPosition.value || userPosition.value < 0) {
    const docPath = doc(firestore.value, 'website', 'linktree', 'metadata', 'userCount')
    runTransaction(firestore.value, (transaction) => {
      return transaction.get(docPath).then((doc) => {
        const serverUserCount = doc.data()?.count

        userPosition.value = serverUserCount + 1
        return transaction.set(docPath, { count: serverUserCount + 1 })
      })
    })
  }

  return {
    links,
    socialMedia,
    subtitles,
    isLoading,
    fetchLinktree,
    updateLinktree,
    userCount,
    userPosition
  }
}

export interface LinkTreeConfigs {
  links: Array<LinkTreeItem>
  socialMedia: Array<SocialMediaItem>
  subtitles: Array<string>
}

export interface LinkTreeItem {
  href: string
  displayText: string
  hidden?: boolean
}

export interface SocialMediaItem {
  href: string
  icon: string
}

const linktreeConverter: FirestoreDataConverter<LinkTreeConfigs> = {
  toFirestore(data: LinkTreeConfigs): DocumentData {
    return data
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): LinkTreeConfigs {
    const data = snapshot.data()!
    const { links, socialMedia, subtitles } = data

    return { links, socialMedia, subtitles }
  }
}
