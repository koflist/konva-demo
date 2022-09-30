import { FC, KeyboardEvent, useCallback, useState } from "react"
import { BaseEditor, createEditor, Descendant, Editor, Transforms } from "slate"
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from "slate-react"
import { EditableProps } from "slate-react/dist/components/editable"

type CustomElementParagraph = { type: "paragraph"; children: CustomText[] }
type CustomElementCode = { type: "code"; children: CustomText[] }
type CustomText = { text: string }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElementParagraph | CustomElementCode
    Text: CustomText
  }
}

const initalValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }]
  }
]

const CodeElement: EditableProps["renderElement"] = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement: EditableProps["renderElement"] = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

const StalePage: FC = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "&") {
      event.preventDefault()
      editor.insertText("and")
    }
    if (event.key === "`" && event.ctrlKey) {
      // Prevent the "`" from being inserted by default.
      event.preventDefault()
      // Otherwise, set the currently selected blocks type to "code".
      Transforms.setNodes(editor, { type: "code" }, { match: (n) => Editor.isBlock(editor, n) })
    }
  }

  return (
    <Slate editor={editor} value={initalValue}>
      <Editable renderElement={renderElement} onKeyDown={onKeyDown}></Editable>
    </Slate>
  )
}

export default StalePage
