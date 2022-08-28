import KonvaPoster from "../konva"
import { WidgetKind } from "../widgets"
import BaseBehavior from "./base"

export default class ChangingBehvior extends BaseBehavior {
  constructor(poster: KonvaPoster) {
    super(poster)
  }

  public override attach(widget: WidgetKind): boolean {
    const { shape } = widget

    if (!shape) {
      return false
    }

    shape.on("scaleXChange scaleYChange xChange yChange", () => {
      console.log("here")
    })

    return true
  }
}
