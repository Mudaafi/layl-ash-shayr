import { AppOptions, Credential, getApp, getApps, initializeApp } from 'firebase-admin'

export default function getFirestore(creds?: Credential) {
  if (getApps().length !== 0) {
    return getApp()
  }

  const config: AppOptions = {
    projectId: 'laylashshayr'
  }

  if (creds) {
    config.credential = creds
  }

  return initializeApp(config)
}
