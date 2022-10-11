import { FC, useState, useMemo, useEffect, useCallback } from "react"
import { createEditor, Descendant, Transforms } from "slate"
import { Editable, Slate, withReact } from "slate-react"
import { Button } from "antd"
import AriesToolbar from "../toolbar"
import { RenderElement } from "../render"
import { ElementTypes } from "../types/element"
import { renderMathInElement, renderMathInDocument } from "mathlive"

import styles from "../assets/editor.module.css"

import withImages from "../plugins/withImage"
import MathView from "react-math-view"
// import { MathfieldElement } from "mathlive"

// const mfe = new MathfieldElement()
// mfe.value = "x=\frac{-bpm sqrt{b^2-4ac}}{2a}"

const initialValue: Descendant[] = [
  {
    type: ElementTypes.paragraph,
    children: [{ text: "A line of text in a paragraph." }]
  },
  {
    type: ElementTypes.latex,
    children: [{ text: "" }]
  }
]

interface Props {
  value?: Descendant[]
}

const AriesEditor: FC<Props> = () => {
  const [value, setValue] = useState<string>("")
  const editor = useMemo(() => withImages(withReact(createEditor())), [])
  const [editorValue, setEditorValue] = useState(initialValue)
  const render = useCallback(RenderElement, [])

  const onClick = () => {
    // Transforms.insertNodes(editor, {
    //   type: ElementTypes.latex,
    //   value: "\\xrightarrow[\\Delta]{\\text{abcd}}",
    //   children: [{ text: "" }]
    // })
    setValue("\tan(x) = \frac{sin\theta}{cos\theta}")
  }

  useEffect(() => {
    // @ts-ignore
    setTimeout(() => {
      setValue("\\xrightarrow[\\Delta]{\\text{abcd}}")
    }, 2000)
  }, [])

  const onChange = (v: Descendant[]) => {
    console.log(v)
    setEditorValue(v)
  }

  useEffect(() => {
    // renderMathInDocument()
  }, [editorValue])

  return (
    <div className={styles["editor_wrapper"]} id="good">
      <MathView>{value}</MathView>
      <Button onClick={onClick}>click</Button>
      <Slate editor={editor} value={editorValue} onChange={onChange}>
        <AriesToolbar></AriesToolbar>
        <Editable renderElement={render} className={styles["editor_container"]}></Editable>
      </Slate>
    </div>
  )
}

export default AriesEditor
