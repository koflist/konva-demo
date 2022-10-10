import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"

export type CustomeEditor = {}

export type AriesEditor = BaseEditor & ReactEditor & CustomeEditor
