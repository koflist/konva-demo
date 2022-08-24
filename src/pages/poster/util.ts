export const LoadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = CreateImage()
    img.onload = () => resolve(img)
    img.onerror = (error) => reject(error)
    img.src = src
  })
}

export const CreateImage = (): HTMLImageElement => {
  const img = new Image()
  img.crossOrigin = "anonymous"
  return img
}
