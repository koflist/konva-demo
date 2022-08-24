import Konva from "konva"
import { LoadImage } from "../util"
import { AvatarWidget, WidgetKind } from "./types"

const DefaultAvatarWidget: AvatarWidget = {
  render: {
    x: 0,
    y: 0,
    r: 0,
    type: WidgetKind.avatar
  },
  inject: {
    image: {
      value: "",
      default: "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/8706701_1do.png"
    }
  }
}

export const createAvatar = async (
  props: AvatarWidget = DefaultAvatarWidget
): Promise<Konva.Group> => {
  const { render, inject } = props

  const group = new Konva.Group({
    clipFunc(context) {
      context.arc(render.x, render.y, render.r, 0, 2 * Math.PI, false)
    }
  })

  const imageUrl = inject.image.value || inject.image.default
  const avatarImage = await LoadImage(imageUrl)
  const konvaImage = new Konva.Image({
    x: render.x - render.r,
    y: render.y - render.r,
    width: render.r * 2,
    height: render.r * 2,
    image: avatarImage
  })

  group.add(konvaImage)
  return group
}
