import { Text } from "konva/lib/shapes/Text"
import { BaseWidget, WidgetConfig, WidgetType } from "./base"

type ExtraRender = {
  width: number
  height: number
  fontSize: number
}
type ExtraInject = {
  text: string
  dynamic: string[]
}
export type TextWidgetConfig = WidgetConfig<WidgetType.text, ExtraRender, ExtraInject>

// Widget.Text
export class TextWidget extends BaseWidget<WidgetType.text, TextWidgetConfig, Text> {
  constructor(config: TextWidgetConfig) {
    super(config)
  }

  override async renderShape() {
    const { render, inject } = this.config

    return new Text({
      text: inject.text,
      x: render.x,
      y: render.y,
      fontSize: render.fontSize,
      width: render.width,
      height: render.height
    })
  }
}
