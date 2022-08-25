import Konva from "konva"

type DraggableType = Konva.Shape | Konva.Group

const DragBoundInfo = {
  cached: false,
  limitX: 0,
  limitY: 0
}

export const attachDraggable = (shape: DraggableType, posterStage: Konva.Stage): boolean => {
  if (posterStage !== shape.getStage()) {
    return false
  }

  // 有缓存
  if (DragBoundInfo.cached) {
    registerDraggable(shape, DragBoundInfo.limitX, DragBoundInfo.limitY)
    return true
  }
  // 无缓存
  else {
    const limitX = Math.floor(posterStage.width())
    const limitY = Math.floor(posterStage.height())

    if (limitX && limitY) {
      if (!DragBoundInfo.cached) {
        DragBoundInfo.limitX = limitX
        DragBoundInfo.limitY = limitY
        DragBoundInfo.cached = true
      }
      registerDraggable(shape, DragBoundInfo.limitX, DragBoundInfo.limitY)
      return true
    } else {
      return false
    }
  }
}

const registerDraggable = (shape: DraggableType, limitX: number, limitY: number) => {
  shape.draggable(true)
  shape.on("dragmove", () => {
    const { width, height } = shape.getClientRect()
    const { x, y } = shape.getAbsolutePosition()

    const correctX = Math.floor(Math.min(Math.max(0, x), limitX - width))
    const correctY = Math.floor(Math.min(Math.max(0, y), limitY - height))
    shape.x(correctX)
    shape.y(correctY)
  })
}
