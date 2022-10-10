import { FC } from "react"
import { useSlateStatic } from "slate-react"
import { ElementTypes } from "../types"
import { NoopText } from "../shared"
import styles from "../assets/toolbar.module.css"
import { Transforms } from "slate"

interface Props {}
const ToolbarLatex: FC<Props> = (props) => {
  const editor = useSlateStatic()
  const onClick = () => {
    // Trasof.insertNode({
    //   type: ElementTypes.latex,
    //   children: [NoopText]
    // })

    Transforms.insertNodes(editor, {
      type: ElementTypes.latex,
      children: [{ text: "" }]
    })
  }

  return (
    <div className={styles["toolbar_item"]} onClick={onClick}>
      ToolbarLatex
    </div>
  )
}

export default ToolbarLatex
