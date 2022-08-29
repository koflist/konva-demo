import KonvaPoster from "../konva"
import { WidgetKind } from "../widgets"
import BaseBehavior from "./base"
import DraggableBehvior from "./draggable"
import UpdatingBehvior from "./management"
import TransformBehvior from "./transform"

export class PosterBehavior {
  private behaviorList: BaseBehavior[] = []

  constructor(poster: KonvaPoster) {
    const transform = new TransformBehvior(poster)
    const draggable = new DraggableBehvior(poster)
    const updating = new UpdatingBehvior(poster)

    this.behaviorList = [transform, draggable, updating]

    for (const widget of poster.renderedWidgets) {
      this.attach(widget)
    }
  }

  public on() {}

  public emit() {}

  public attach(widget: WidgetKind) {
    for (const behavior of this.behaviorList) {
      behavior.attach(widget)
    }
  }
}
