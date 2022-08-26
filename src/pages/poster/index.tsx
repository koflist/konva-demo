import { FC, useEffect } from "react"
import { InitKonva } from "./konva"

import { WidgetKind } from "./widgets/base"
import { renderWidget, WidgetDataType } from "./widgets/index"

const background = "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/1802112_nnt.png"

const widgetData: WidgetDataType[] = [
  {
    type: WidgetKind.qrcode,
    config: {
      render: {
        x: 310,
        y: 670,
        width: 100
      },
      inject: {
        url: "https://www.baidu.com?userId={placeholder1}",
        query: []
      }
    }
  },
  {
    type: WidgetKind.text,
    config: {
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
    }
  },
  {
    type: WidgetKind.avatar,
    config: {
      render: {
        x: 100,
        y: 100,
        r: 30
      },
      inject: {
        image: "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/8706701_1do.png"
      }
    }
  }
]

const PosterPage: FC = () => {
  useEffect(() => {
    Init()
  }, [])

  const Init = async () => {
    const [stage, layer] = await InitKonva(background, "#poster-attach")

    for (const data of widgetData) {
      renderWidget(data).then((shape) => shape && layer.add(shape))
    }
  }

  return <div id="poster-attach"></div>
}

export default PosterPage
