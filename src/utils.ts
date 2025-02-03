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
