import Konva from "konva"
import { TextWidget, WidgetKind } from "./types"

const DefaultTextWidget: TextWidget = {
  render: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    type: WidgetKind.text
  },
  inject: {
    text: {
      value: "",
      default: "hello world"
    },
    dynamic: {
      value: [],
      default: []
    }
  }
}

export const createText = async (props: TextWidget = DefaultTextWidget) => {
  const { render, inject } = props

  return new Konva.Text({
    draggable: true,
    text: inject.text.value || inject.text.default,
    x: render.x,
    y: render.y,
    fontSize: 20,
    width: render.width,
    height: render.height
  })
}
