export enum WidgetKind {
  unset,
  avatar,
  qrcode,
  text
}

// Widget: 渲染配置定义
export type RenderType<T extends WidgetKind, AppendObject = unknown> = {
  x: number
  y: number
  type: T
} & AppendObject

// Widget: 注入数据定义
export type InjectType<T> = {
  [K in keyof T]: {
    value?: T[K]
    default: T[K]
  }
}

// Widget定义
export type WidgetType<T extends WidgetKind, DataKeys = unknown, AppendObject = unknown> = {
  inject: InjectType<DataKeys>
  render: RenderType<T, AppendObject>
}

// Widget 头像
type AvatarExtraRender = {
  r: number
}
type AvatarInjectData = {
  image: string
}
export type AvatarWidget = WidgetType<WidgetKind.avatar, AvatarInjectData, AvatarExtraRender>

// Widget 二维码
type QrcodeExtraData = {
  url: string
  query: string[]
}
type QrcodeExtraRender = {
  width: number
}
export type QrcodeWidget = WidgetType<WidgetKind.qrcode, QrcodeExtraData, QrcodeExtraRender>

// Widget 文字
type TextExtraData = {
  text: string
  dynamic: string[]
}
type TextExtraRender = {
  width: number
  height: number
}
export type TextWidget = WidgetType<WidgetKind.text, TextExtraData, TextExtraRender>
