import AvatarWidget, { AvatarWidgetConfig } from "./avatar"
import { WidgetKind, WidgetShape } from "./base"
import QrcodeWidget, { QrcodeWidgetConfig } from "./qrcode"
import TextWidget, { TextWidgetConfig } from "./text"

export type WidgetDataType = {
  type: WidgetKind
  config: AvatarWidgetConfig | QrcodeWidgetConfig | TextWidgetConfig
}

export const renderWidget = (data: WidgetDataType): Promise<WidgetShape | null> => {
  switch (data.type) {
    case WidgetKind.avatar:
      return new AvatarWidget(data.config as AvatarWidgetConfig).renderFinish()
    case WidgetKind.qrcode:
      return new QrcodeWidget(data.config as QrcodeWidgetConfig).renderFinish()
    case WidgetKind.text:
      return new TextWidget(data.config as TextWidgetConfig).renderFinish()
    default:
      return Promise.resolve(null)
  }
}
