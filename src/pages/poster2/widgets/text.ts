import Konva from "konva"
import { BaseWidget, WidgetConfig, WidgetKind } from "./types"

type ExtraRender = {
  width: number
  height: number
}
type ExtraInject = {
  text: string
  dynamic: string[]
}
export type TextWidgetConfig = WidgetConfig<ExtraRender, ExtraInject>

export default class TextWidget extends BaseWidget<TextWidgetConfig, Konva.Text> {
  constructor(config: TextWidgetConfig) {
    super(WidgetKind.text, config)
  }

  override async renderShape() {
    const { render, inject } = this.config

    return new Konva.Text({
      text: inject.text,
      x: render.x,
      y: render.y,
      fontSize: 20,
      width: render.width,
      height: render.height
    })
  }
}
