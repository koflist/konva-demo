import { FC, useState, useMemo, useEffect, useCallback } from "react"
import { createEditor, Descendant, Transforms } from "slate"
import { Editable, Slate, withReact } from "slate-react"
import { Button } from "antd"
import AriesToolbar from "../toolbar"
import { RenderElement } from "../render"
import { ElementTypes } from "../types/element"

import styles from "../assets/editor.module.css"

import withImages from "../plugins/withImage"
import MathView from "react-math-view"

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
    Transforms.insertNodes(editor, {
      type: ElementTypes.latex,
      children: [{ text: "" }]
    })
  }

  return (
    <div className={styles["editor_wrapper"]}>
      <Slate editor={editor} value={editorValue} onChange={(v) => setEditorValue(v)}>
        <AriesToolbar></AriesToolbar>
        <Button onClick={onClick}>123</Button>
        <MathView contentEditable={false} value={value}></MathView>
        <Editable renderElement={render} className={styles["editor_container"]}></Editable>
      </Slate>
    </div>
  )
}

export default AriesEditor
