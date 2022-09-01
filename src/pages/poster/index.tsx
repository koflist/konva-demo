import { PosterBehavior } from "@/poster/behavior"
import { Messager, MessagerType } from "@/poster/messager"
import { WidgetType } from "@/poster/widgets"
import { FC, useEffect, useMemo, useState } from "react"
import KonvaPoster, { PosterConfig } from "../../poster/konva"

const posterConfig: PosterConfig = {
  background: {
    url: "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/1802112_nnt.png",
    width: 544,
    height: 968
  },
  widgets: [
    {
      type: WidgetType.qrcode,
      render: {
        x: 310,
        y: 670,
        width: 100,
        height: 100,
        rotation: 0
      },
      inject: {
        url: "https://www.baidu.com?userId={placeholder1}",
        query: []
      }
    },
    {
      type: WidgetType.text,
      render: {
        x: 60,
        y: 240,
        width: 50,
        height: 50,
        rotation: 0,
        fontSize: 20
      },
      inject: {
        text: `100\n分钟`,
        dynamic: []
      }
    },
    {
      type: WidgetType.avatar,
      render: {
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        rotation: 0 * Math.PI
      },
      inject: {
        image: "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/8706701_1do.png"
      }
    }
  ]
}

const PosterPage: FC = () => {
  const [dataURL, setDataURL] = useState<string>("")

  useEffect(() => {
    Init()
  }, [])

  const img = useMemo(() => {
    return <img src={dataURL} alt="" />
  }, [dataURL])

  const Init = async () => {
    const poster = new KonvaPoster(posterConfig)
    poster.renderFinsh().then(() => {
      poster.stage.setContainer("#container")
      new PosterBehavior(poster)

      const message = new Messager(MessagerType.parent)
      // message.listen()
    })
  }

  return (
    <div id="poster-attach">
      <div id="container"></div>
    </div>
  )
}

export default PosterPage
