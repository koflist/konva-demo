import { FC } from "react"
import { InitKonva } from "./konva"

const background = "https://conan-online.fbcontent.cn/aries-oss-resource/web-assets/1802112_nnt.png"

const PosterPage: FC = () => {
  InitKonva(background, "#poster-attach")
  return <div id="poster-attach"></div>
}

export default PosterPage
