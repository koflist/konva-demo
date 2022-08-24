import { FC, useEffect } from "react"
import { InitKonva } from "./konva"
import { createAvatar } from "./widgets/avatar"
import { createQrcode } from "./widgets/qrcode"
import { createText } from "./widgets/text"
import { AvatarWidget, QrcodeWidget, TextWidget, WidgetKind } from "./widgets/types"

const background = "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/1802112_nnt.png"

const PosterPage: FC = () => {
  useEffect(() => {
    Init()
  }, [])

  const Init = async () => {
    const [stage, layer] = await InitKonva(background, "#poster-attach")
    const avatar: AvatarWidget = {
      render: {
        x: 30,
        y: 30,
        r: 30,
        type: WidgetKind.avatar
      },
      inject: {
        image: {
          value: "",
          default: "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/8706701_1do.png"
        }
      }
    }

    const qrcode: QrcodeWidget = {
      render: {
        x: 310,
        y: 670,
        width: 100,
        type: WidgetKind.qrcode
      },
      inject: {
        url: {
          value: "",
          default: "https://www.baidu.com"
        },
        query: {
          value: [],
          default: []
        }
      }
    }

    const textWidget: TextWidget = {
      render: {
        x: 60,
        y: 240,
        width: 50,
        height: 50,
        type: WidgetKind.text
      },
      inject: {
        text: {
          value: "",
          default: "hello world"
        },
        dynamic: {
          value: [],
          default: []
        }
      }
    }

    createAvatar(avatar).then((group) => {
      layer.add(group)
    })

    createQrcode(qrcode).then((widget) => {
      layer.add(widget)
    })

    createText(textWidget).then((widget) => {
      layer.add(widget)
    })
  }

  return <div id="poster-attach"></div>
}

export default PosterPage
