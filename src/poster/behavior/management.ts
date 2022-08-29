import KonvaPoster from "../konva"
import { WidgetConfig, WidgetKind } from "../widgets"
import BaseBehavior from "./base"

export default class UpdatingBehvior extends BaseBehavior {
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

  public add() {}

  public delete() {}

  public update(config: WidgetConfig) {
    if (!config.id) {
      return false
    }
  }
}
