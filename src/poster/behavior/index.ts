import KonvaPoster from "../konva"
import { EventFunc, EventType } from "../messager"

import BaseBehavior from "./base"
import DraggableBehvior from "./draggable"
import ManagementBehvior from "./management"
import TransformBehvior from "./transform"

interface IPosterBehavior {
  trigger: EventFunc
  listen: (callback: EventFunc) => void
}

export class PosterBehavior implements IPosterBehavior {
  private behaviorList: BaseBehavior[] = []
  private management?: ManagementBehvior

  constructor(poster: KonvaPoster) {
    const transform = new TransformBehvior(poster)
    const draggable = new DraggableBehvior(poster)
    const management = new ManagementBehvior(poster)
    this.management = management

    this.behaviorList = [transform, draggable, management]

    for (const widget of poster.renderedWidgets) {
      for (const behavior of this.behaviorList) {
        behavior.attach(widget)
      }
    }
  }

  public trigger(event: EventType, payload: any) {
    // this.management?.trigger(event, payload)
  }

  public listen(callback: EventFunc) {
    this.management?.listen(callback)
  }
}
