import KonvaPoster from "../konva"
import { WidgetKind } from "../widgets"

export default abstract class BaseBehavior {
  protected readonly poster: KonvaPoster
  protected readonly limitX: number
  protected readonly limitY: number

  constructor(poster: KonvaPoster) {
    this.poster = poster
    this.limitX = Math.floor(this.poster.stage.width())
    this.limitY = Math.floor(this.poster.stage.height())
  }

  public abstract attach(widget: WidgetKind): boolean
}
