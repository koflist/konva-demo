import { FC } from "react"
import styles from "../assets/toolbar.module.css"
import { useSlateStatic } from "slate-react"
import { ElementTypes } from "../types"
import { NoopText } from "../shared"

interface Props {}

const ToolbarImage: FC<Props> = () => {
  const editor = useSlateStatic()
  const onClick = () => {
    editor.insertNode({
      type: ElementTypes.image,
      url: "https://source.unsplash.com/zOwZKwZOZq8",
      width: 120,
      children: [NoopText]
    })
  }

  return (
    <div className={styles["toolbar_item"]} onClick={onClick}>
      <svg viewBox="0 0 1024 1024">
        <path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path>
      </svg>
    </div>
  )
}

export default ToolbarImage
