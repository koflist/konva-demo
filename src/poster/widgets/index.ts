import { AvatarWidget, AvatarWidgetConfig } from "./avatar"
import { QrcodeWidget, QrcodeWidgetConfig } from "./qrcode"
import { TextWidget, TextWidgetConfig } from "./text"

export * from "./avatar"
export * from "./base"
export * from "./qrcode"
export * from "./text"

export type WidgetConfig = AvatarWidgetConfig | QrcodeWidgetConfig | TextWidgetConfig
export type WidgetKind = AvatarWidget | QrcodeWidget | TextWidget
