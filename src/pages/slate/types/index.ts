import { AriesText } from "./text"
import { AriesElement } from "./element"
import { AriesEditor } from "./editor"
export * from "./text"
export * from "./element"
export * from "./editor"

declare module "slate" {
  interface CustomTypes {
    Editor: AriesEditor
    Element: AriesElement
    Text: AriesText
  }
}
