import { Group } from "konva/lib/Group"
import { Image as KonvaImage } from "konva/lib/shapes/Image"
import { LoadImage } from "../../pages/poster/util"
import { BaseWidget, WidgetConfig, WidgetType } from "./base"

type ExtraRender = {
  r: number
}
type ExtraInject = {
  image: string
}
export type AvatarWidgetConfig = WidgetConfig<WidgetType.avatar, ExtraRender, ExtraInject>

// Widget.Avatar
export class AvatarWidget extends BaseWidget<WidgetType.avatar, AvatarWidgetConfig, Group> {
  private innerImgShape: KonvaImage | null

  constructor(config: AvatarWidgetConfig) {
    super(config)
    this.innerImgShape = null
  }

  override async renderShape() {
    const { render, inject } = this.config

    const group = new Group({
      clipFunc(context) {
        context.arc(render.x + render.r, render.y + render.r, render.r, 0, 2 * Math.PI, false)
      }
    })

    const imageUrl = inject.image
    const avatarImage = await LoadImage(imageUrl)

    this.innerImgShape = new KonvaImage({
      x: render.x,
      y: render.y,
      width: render.r * 2,
      height: render.r * 2,
      image: avatarImage
    })
    this.innerImgShape.setAttr("widget", this)
    group.add(this.innerImgShape)

    return group
  }

  public override toObject(): AvatarWidgetConfig {
    return this.shape
      ? {
          type: this.type,
          inject: this.config.inject,
          render: {
            x: this.shape.x(),
            y: this.shape.y(),
            r: (this.shape.width() * this.shape.scaleX()) / 2
          }
        }
      : this.config
  }
}
