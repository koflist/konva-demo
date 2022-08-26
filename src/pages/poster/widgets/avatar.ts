import Konva from "konva"
import { LoadImage } from "../util"
import { BaseWidget, WidgetConfig, WidgetKind } from "./base"

type ExtraRender = {
  r: number
}
type ExtraInject = {
  image: string
}
export type AvatarWidgetConfig = WidgetConfig<ExtraRender, ExtraInject>

export default class AvatarWidget extends BaseWidget<AvatarWidgetConfig, Konva.Group> {
  constructor(config: AvatarWidgetConfig) {
    super(WidgetKind.avatar, config)
  }

  override async renderShape() {
    const { render, inject } = this.config

    const group = new Konva.Group({
      clipFunc(context) {
        context.arc(render.x, render.y, render.r, 0, 2 * Math.PI, false)
      }
    })

    const imageUrl = inject.image
    const avatarImage = await LoadImage(imageUrl)
    const konvaImage = new Konva.Image({
      x: render.x - render.r,
      y: render.y - render.r,
      width: render.r * 2,
      height: render.r * 2,
      image: avatarImage
    })

    group.add(konvaImage)
    return group
  }
}
