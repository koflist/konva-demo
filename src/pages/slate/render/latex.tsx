import { FC, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react"
import { LatexElement } from "../types"
import MathView from "react-math-view"
import { renderMathInElement, MathfieldElement } from "mathlive"
import { Transforms } from "slate"

let guid = 0

const create = () => {
  const mfe = (
    <MathView
      value="$$\frac{pi}{2}$$"
      onLoad={() => {
        console.log("here")
      }}
    ></MathView>
  )
}

const DefualtLaTex = "\\xrightarrow[\\Delta]{\\text{abcd}}"
const RenderLatex: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props
  const element = props.element as LatexElement

  const editor = useSlateStatic()
  const [value, setValue] = useState<string>(element.value || DefualtLaTex)
  const [id] = useState<string>(`mfe-${guid++}`)

  const MFE = useMemo(() => {
    const mfe = new MathfieldElement()
    mfe.value = value
    mfe.readonly = true
    return mfe
  }, [value])

  useEffect(() => {
    const container = document.querySelector(`#${id}`) as HTMLDivElement
    console.log(container)
    if (container) {
      for (const child of container.childNodes) {
        container.removeChild(child)
      }
      container.appendChild(MFE)
    }
  }, [MFE])

  const onClick = () => {
    setValue("\\xrightarrow[\\Delta]{\\text{abcde}}")
  }

  return (
    <div {...attributes} contentEditable={false} onClick={onClick} defaultValue={value}>
      <span>{children}</span>
      <div id={id}></div>
    </div>
  )
}

export default RenderLatex
