import { FC, useEffect } from "react"
import { InitKonva } from "./konva"

import AvatarWidget from "./widgets/avatar"
import QrcodeWidget from "./widgets/qrcode"
import TextWidget from "./widgets/text"

const background = "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/1802112_nnt.png"

const widgetData = [{}]

const PosterPage: FC = () => {
  useEffect(() => {
    Init()
  }, [])

  const Init = async () => {
    const [stage, layer] = await InitKonva(background, "#poster-attach")

    const qrcode = new QrcodeWidget({
      render: {
        x: 310,
        y: 670,
        width: 100
      },
      inject: {
        url: "https://www.baidu.com?userId={placeholder1}",
        query: []
      }
    })

    qrcode.renderFinish().then((shape) => {
      layer.add(shape)
    })

    const text = new TextWidget({
      render: {
        x: 60,
        y: 240,
        width: 50,
        height: 50
      },
      inject: {
        text: "hello world",
        dynamic: []
      }
    })

    text.renderFinish().then((shape) => {
      layer.add(shape)
    })

    const avatar = new AvatarWidget({
      render: {
        x: 100,
        y: 100,
        r: 30
      },
      inject: {
        image: "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/8706701_1do.png"
      }
    })
    avatar.renderFinish().then((shape) => {
      layer.add(shape)
    })
  }

  return <div id="poster-attach"></div>
}

export default PosterPage
