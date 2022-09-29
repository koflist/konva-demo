import { FC, KeyboardEvent, useState } from "react"
import { BaseEditor, createEditor, Descendant } from "slate"
import { Editable, ReactEditor, Slate, withReact } from "slate-react"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initalValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }]
  }
]

const StalePage: FC = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    console.log(event.key)
  }

  return (
    <Slate editor={editor} value={initalValue}>
      <Editable onKeyDown={onKeyDown}></Editable>
    </Slate>
  )
}

export default StalePage
