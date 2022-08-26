import { BaseWidget } from "@/pages/poster/widgets/base"
import { Layer } from "konva/lib/Layer"
import { Stage } from "konva/lib/Stage"

export const attachRendering = (widget: BaseWidget, stage: Stage) => {
  const rootLayer = stage.findOne("rootLayer") as Layer

  if (!rootLayer) {
    return false
  }

  if (!widget.shape) {
    return false
  }

  rootLayer.add(widget.shape)
}
