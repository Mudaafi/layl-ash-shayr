export function convertDriveImgToLinkable(imgLink: string) {
  const imgId = imgLink.match(/.*\/d\/([^/]*)\/?/)?.[1]
  console.log(imgId)

  return `https://drive.google.com/thumbnail?id=${imgId}&sz=w1000`
}
