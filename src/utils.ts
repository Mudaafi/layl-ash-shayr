export function convertDriveImgToLinkable(imgLink: string) {
  if (!imgLink) return ''

  let imgId: string | null | undefined = imgLink.match(/.*\/d\/([^/]*)\/?/)?.[1]

  if (!imgId) {
    const url = new URL(imgLink)
    imgId = url.searchParams.get('id')
  }

  // return `https://drive.google.com/thumbnail?id=${imgId}&sz=w1000`
  return `https://lh3.googleusercontent.com/d/${imgId}=w1000?authuser=0`
}

export function decodeJWT(token: string) {
  let base64Url = token.split('.')[1]

  if (!base64Url) throw new Error('Invalid JWT token')

  let base64Cleaned = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  let jsonStr = decodeURIComponent(atob(base64Cleaned).split('').map(toASCII).join(''))

  return JSON.parse(jsonStr)
}

export function toASCII(char: string) {
  return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
}
