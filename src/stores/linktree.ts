import { useStorage } from '@vueuse/core'
import useFiretore from './firestore'
import {
  doc,
  getDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type FirestoreDataConverter,
  setDoc
} from 'firebase/firestore/lite'
import { computed } from 'vue'
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

  return {
    links,
    socialMedia,
    subtitles,
    isLoading,
    fetchLinktree,
    updateLinktree
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
