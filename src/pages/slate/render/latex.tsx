import { FC, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { RenderElementProps, useSlateStatic } from "slate-react"
import { LatexElement } from "../types"
import MathView, { MathViewProps, MathViewRef } from "react-math-view"

const RenderLatex: FC<RenderElementProps> = (props) => {
  const editor = useSlateStatic()
  const [value, setValue] = useState<string>("x=\frac{-bpm sqrt{b^2-4ac}}{2a}")
  const { attributes, children } = props
  const element = props.element as LatexElement

  const onChange = useCallback((e: React.SyntheticEvent<any, any>) => {
    setValue(e.currentTarget.getValue())
  }, [])

  const MathViewMemo = useMemo(() => {
    return (
      <MathView
        onLoad={() => console.log("here")}
        value={"x=\frac{-bpm sqrt{b^2-4ac}}{2a}"}
        onChange={onChange}
      ></MathView>
    )
  }, [])

  setTimeout(() => {
    setValue("x=\frac{-bpm sqrt{b^2-4ac}}{2a}")
  }, 2000)

  setTimeout(() => {
    // @ts-ignore
    window.MathLive.renderMathInDocument()
    console.log("render")
  }, 4000)

  return (
    <div {...attributes} style={{ position: "relative", width: 100, height: 100 }}>
      {children}
      <math-field onLoad={() => console.log("here")}>{value}</math-field>
    </div>
  )
}

export default RenderLatex
