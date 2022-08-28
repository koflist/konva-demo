import KonvaPoster from "../konva"
import { WidgetKind } from "../widgets"
import BaseBehavior from "./base"
import ChangingBehvior from "./changing"
import DraggableBehvior from "./draggable"
import TransformBehvior from "./transform"

export class PosterBehavior {
  private behaviorList: BaseBehavior[] = []

  constructor(poster: KonvaPoster) {
    this.behaviorList = [
      new TransformBehvior(poster),
      new DraggableBehvior(poster),
      new ChangingBehvior(poster)
    ]
  }

  public attach(widgets: WidgetKind[] = []) {
    for (const behavior of this.behaviorList) {
      for (const item of widgets) {
        behavior.attach(item)
      }
    }
  }
}
