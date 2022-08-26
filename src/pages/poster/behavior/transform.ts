import Konva from "konva"

type TransferableType = Konva.Shape | Konva.Group
const transformShapes: TransferableType[] = []
let registered: boolean = false

export const attachTransform = (shape: TransferableType, stage: Konva.Stage): boolean => {
  if (!registered) {
    registerTransformEvent(stage)
  }

  console.log(shape)
  transformShapes.push(shape)

  return true
}

// stage注册点击事件 取消transfrom选中
const registerTransformEvent = (stage: Konva.Stage) => {
  const rectTransformer = new Konva.Transformer()
  let currentTransformer: Konva.Transformer | null = null

  stage.on("pointerup", (event) => {
    const target = event.target
    if (target === stage && currentTransformer) {
      currentTransformer.nodes([])
    }

    const shape = transformShapes.find((it) => it === target)

    if (shape) {
      currentTransformer = rectTransformer
      currentTransformer.nodes([shape])
    }
  })

  registered = true
}
