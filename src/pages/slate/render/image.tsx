import { FC } from "react"
import { Popover, Button } from "antd"
import {} from "react-router"
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react"
import { ImageElement } from "../types/element"
import { Transforms } from "slate"

interface Props {
  onRemove: () => void
  onResize: () => void
}
const ImageToolTips: FC<Props> = (props) => {
  return (
    <div>
      <Button onClick={props.onResize}>resize</Button>
      <Button onClick={props.onRemove}>remove</Button>
    </div>
  )
}

const RenderImage: FC<RenderElementProps> = (props) => {
  const editor = useSlateStatic()
  const { attributes, children } = props
  const element = props.element as ImageElement

  const { width, height } = element
  const imgStyle = {
    width: width + "px",
    height: height ? height + "px" : "auto"
  }

  const onRemove = () => {
    const path = ReactEditor.findPath(editor, element)
    Transforms.removeNodes<ImageElement>(editor, { at: path })
  }

  const onResize = () => {
    const path = ReactEditor.findPath(editor, element)
    Transforms.setNodes<ImageElement>(editor, { width: element.width + 1 }, { at: path })
  }

  return (
    <div {...attributes} style={{ display: "inline-block" }}>
      {children}
      <div contentEditable={false} style={{ position: "relative" }}>
        <Popover content={<ImageToolTips onResize={onResize} onRemove={onRemove}></ImageToolTips>}>
          <img style={imgStyle} src={element.url} />
        </Popover>
      </div>
    </div>
  )
}

export default RenderImage
