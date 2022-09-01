import { LoadImage } from "@/pages/poster/util"
import { SceneContext } from "konva/lib/Context"
import { Group } from "konva/lib/Group"
import { Image as KonvaImage } from "konva/lib/shapes/Image"
import { BaseWidget, WidgetConfig, WidgetType } from "./base"

type ExtraInject = {
  image: string
}
export type AvatarWidgetConfig = WidgetConfig<WidgetType.avatar, unknown, ExtraInject>

// Widget.Avatar
export class AvatarWidget extends BaseWidget<WidgetType.avatar, AvatarWidgetConfig, Group> {
  private innerImgShape: KonvaImage

  constructor(config: AvatarWidgetConfig) {
    super(config)
    this.innerImgShape = new KonvaImage({ image: undefined })
  }

  protected override createShape(): Group {
    const group = new Group()
    this.innerImgShape = new KonvaImage({ image: undefined })
    this.innerImgShape.setAttr("widget", this)
    group.add(this.innerImgShape)
    return group
  }

  protected async renderShape(group: Group, config: AvatarWidgetConfig) {
    const { render, inject } = config

    group.setAttrs({
      clipFunc(context: SceneContext) {
        const r = render.width / 2
        context.arc(render.x + r, render.y + r, r, 0, 2 * Math.PI, false)
      }
    })

    const imageUrl = inject.image
    const avatarImage = await LoadImage(imageUrl)
    this.innerImgShape.setAttrs({
      x: render.x,
      y: render.y,
      width: render.width,
      height: render.width,
      image: avatarImage
    })
  }

  public override toObject(): AvatarWidgetConfig {
    return {
      type: this.type,
      inject: this.config.inject,
      render: {
        x: this.shape.x(),
        y: this.shape.y(),
        width: this.shape.width() * this.shape.scaleX(),
        height: this.shape.height() * this.shape.scaleY(),
        rotation: this.shape.rotation()
      }
    }
  }
}
