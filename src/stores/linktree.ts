import { useStorage } from '@vueuse/core'
import useFiretore from './firestore'
import {
  doc,
  getDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type FirestoreDataConverter
} from 'firebase/firestore/lite'

/**
 * Because we need auth to allow for writes, google macros won't cut it.
 * We'll use Firestore instead, with read-all and write-authed permissions.
 *
 * Firestore should be client-side, to reduce auth complexity.
 *
 * Probably should define a ttl to prevent spams. I wonder if we'll need a ddos protector :think:
 * Surely firestore has it's own ddos protection right...? Altho I guess if their customers get surged on that's better for them
 *
 */

export default function useLinktree() {
  const { firestore } = useFiretore()
  const documentPath = doc(firestore, 'website', 'linktree').withConverter(linktreeConverter)
  const links = useStorage<Array<LinkTreeItem>>('linktree-links', [], sessionStorage)

  async function fetchLinktree() {
    const document = await getDoc(documentPath)
    const fetchedLinks = document.data()

    links.value = fetchedLinks
  }

  return {
    links,
    fetchLinktree
  }
}

export interface LinkTreeItem {
  href: string
  displayText: string
}

const linktreeConverter: FirestoreDataConverter<Array<LinkTreeItem>> = {
  toFirestore(links: Array<LinkTreeItem>): DocumentData {
    return { links }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Array<LinkTreeItem> {
    const data = snapshot.data()!
    const links = data.links

    return links
  }
}
