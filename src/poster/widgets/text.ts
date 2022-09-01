import { Text } from "konva/lib/shapes/Text"
import { BaseWidget, WidgetConfig, WidgetType } from "./base"

type ExtraRender = {
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

  protected override createShape(): Text {
    return new Text({})
  }

  public override async renderShape(text: Text, config: TextWidgetConfig) {
    const { render, inject } = config

    text.setAttrs({
      text: inject.text,
      x: render.x,
      y: render.y,
      width: render.width,
      height: render.height,
      rotation: render.rotation,
      fontSize: render.fontSize
    })
  }

  public override toObject(): TextWidgetConfig {
    return {
      type: this.type,
      inject: this.config.inject,
      render: {
        x: this.shape.x(),
        y: this.shape.y(),
        width: this.shape.width() * this.shape.scaleX(),
        height: this.shape.height() * this.shape.scaleY(),
        rotation: this.shape.rotation(),
        fontSize: this.config.render.fontSize
      }
    }
  }
}
