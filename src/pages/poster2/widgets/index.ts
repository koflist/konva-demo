import AvatarWidget, { AvatarWidgetConfig } from "./avatar"
import { QrcodeWidgetConfig } from "./qrcode"
import { TextWidgetConfig } from "./text"
import { WidgetKind } from "./types"

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
