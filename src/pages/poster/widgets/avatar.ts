import Konva from "konva"
import { TAvatarRender, TAvatarRuntimData, WidgetType } from "./types"

const DefaultRenderConfig: TAvatarRender = {
  x: 0,
  y: 0,
  r: 0,
  type: WidgetType.avatar
}

const DefaultRuntimeData: TAvatarRuntimData = {
  avatar: {
    default: "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/8706701_1do.png",
    value: ""
  }
}

export const createAvatar = async (
  renderConfig: TAvatarRender = DefaultRenderConfig,
  runtimeData: TAvatarRuntimData = DefaultRuntimeData
) => {
  const group = new Konva.Group({
    clipFunc(context) {
      context.arc(renderConfig.x, renderConfig.y, renderConfig.r, 0, 2 * Math.PI, false)
    }
  })

  // const bgImage = await LoadImage(runtimeData.runtimeAvatar)
}
