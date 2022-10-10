import { useCallback } from "react"
import { RenderElementProps } from "slate-react"
import { ElementTypes } from "../types/element"
import RenderImage from "./image"
import RenderLatex from "./latex"

export const RenderElement = (props: RenderElementProps) => {
  const { children, attributes, element } = props

  switch (element.type) {
    case ElementTypes.image:
      return <RenderImage {...props}></RenderImage>
    case ElementTypes.latex:
      return <RenderLatex {...props}></RenderLatex>
    case ElementTypes.paragraph:
    default:
      return <p {...attributes}>{children}</p>
  }
}
