import { AvatarWidget, AvatarWidgetConfig } from "./avatar"
import { WidgetType } from "./base"
import { QrcodeWidget, QrcodeWidgetConfig } from "./qrcode"
import { TextWidget, TextWidgetConfig } from "./text"

export * from "./avatar"
export * from "./base"
export * from "./qrcode"
export * from "./text"

export type WidgetConfig = AvatarWidgetConfig | QrcodeWidgetConfig | TextWidgetConfig
export type WidgetKind = AvatarWidget | QrcodeWidget | TextWidget

export const WidgetAssert = (
  widget: WidgetKind,
  config: WidgetConfig,
  callback: (widget: WidgetKind, config: WidgetConfig) => void
) => {
  let target = widget
  switch (config.type) {
    case WidgetType.avatar:
      callback(widget as AvatarWidget, config as AvatarWidgetConfig)
    case WidgetType.qrcode:
      target = widget as QrcodeWidget
      callback(widget as QrcodeWidget, config as QrcodeWidgetConfig)
    case WidgetType.text:
      target = widget as TextWidget
      callback(widget as TextWidget, config as TextWidgetConfig)
  }
}
