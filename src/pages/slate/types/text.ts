export type EmptyText = {
  text: ""
}

export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
}

export type AriesText = CustomText | EmptyText
