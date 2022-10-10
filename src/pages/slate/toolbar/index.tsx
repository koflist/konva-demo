import { FC } from "react"

import ToolbarImage from "./image"
import ToolbarLatex from "./latex"
import styles from "../assets/toolbar.module.css"

interface Props {}

const AriesToolbar: FC<Props> = (props) => {
  return (
    <div className={styles["toolbar_wrapper"]}>
      <div className={styles["toolbar_container"]}>
        <ToolbarImage></ToolbarImage>
      </div>
      <div className={styles["toolbar_container"]}>
        <ToolbarLatex></ToolbarLatex>
      </div>
    </div>
  )
}

export default AriesToolbar
