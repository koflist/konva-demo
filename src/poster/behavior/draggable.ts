import KonvaPoster from "../konva"
import { WidgetKind } from "../widgets"
import BaseBehavior from "./base"

export default class DraggableBehvior extends BaseBehavior {
  constructor(poster: KonvaPoster) {
    super(poster)
  }

  public override attach(widget: WidgetKind): boolean {
    const { shape } = widget

    if (!shape) {
      return false
    }

    shape.draggable(true)
    shape.on("dragmove", () => {
      const { width, height } = shape.getClientRect()
      const { x, y } = shape.getAbsolutePosition()

      const correctX = Math.floor(Math.min(Math.max(0, x), this.limitX - width))
      const correctY = Math.floor(Math.min(Math.max(0, y), this.limitY - height))
      shape.x(correctX)
      shape.y(correctY)
    })

    return true
  }
}
