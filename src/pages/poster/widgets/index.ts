import AvatarWidget, { AvatarWidgetConfig } from "./avatar"
import { WidgetKind } from "./base"
import { QrcodeWidgetConfig } from "./qrcode"
import { TextWidgetConfig } from "./text"

type WidgetDataType = {
  type: WidgetKind
  config: AvatarWidgetConfig | QrcodeWidgetConfig | TextWidgetConfig
}

const renderWidget = (data: WidgetDataType) => {
  switch (data.type) {
    case WidgetKind.avatar:
      const widget = new AvatarWidget(data.config as AvatarWidgetConfig)
      widget.renderFinish()
  }
}
