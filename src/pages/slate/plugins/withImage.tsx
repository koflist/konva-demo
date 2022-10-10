import { AriesEditor } from "../types"
import { ElementTypes } from "../types/element"

const withImages = (editor: AriesEditor) => {
  const { isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === ElementTypes.image || element.type === ElementTypes.latex
      ? true
      : isVoid(element)
  }

  return editor
}

export default withImages
