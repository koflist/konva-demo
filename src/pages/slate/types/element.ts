import { CustomText, EmptyText } from "./text"

export enum ElementTypes {
  image = "image",
  latex = "latex",
  paragraph = "paragraph"
}

// 段落 - <p>
export type ParagraphElement = {
  type: ElementTypes.paragraph
  children: CustomText[]
}

// 公式 - <mathlive>
export type LatexElement = {
  type: ElementTypes.latex
  value?: string
  children: [EmptyText]
}

// 图片 - <image>
export type ImageElement = {
  type: ElementTypes.image
  url: string
  width: number
  height?: number
  children: [EmptyText]
}

export type AriesElement = ParagraphElement | LatexElement | ImageElement
