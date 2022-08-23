import Konva from "konva"
import { LoadImage } from "./util"

export const InitKonva = async (
  backgroundUrl: string,
  querySelector: string
): Promise<Konva.Stage> => {
  const scale = 0.4
  const KonvaBgImage = await RenderBackground(backgroundUrl, scale)

  const stage = new Konva.Stage({
    container: querySelector,
    width: KonvaBgImage.width(),
    height: KonvaBgImage.height()
  })

  const layer = new Konva.Layer()
  layer.add(KonvaBgImage)
  stage.add(layer)

  return stage
}

export const RenderBackground = async (
  backgroundUrl: string,
  scale: number = 1
): Promise<Konva.Image> => {
  const bgImage = await LoadImage(backgroundUrl)
  return new Konva.Image({
    x: 0,
    y: 0,
    width: bgImage.width * scale,
    height: bgImage.height * scale,
    image: bgImage
  })
}
