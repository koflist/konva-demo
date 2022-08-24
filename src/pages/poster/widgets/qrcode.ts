import QRCode from "easyqrcodejs"
import Konva from "konva"
import { CreateImage, LoadImage } from "../util"
import { QrcodeWidget, WidgetKind } from "./types"

const DefaultQrcodeWidget: QrcodeWidget = {
  render: {
    x: 0,
    y: 0,
    width: 0,
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

export const createQrcode = async (props: QrcodeWidget = DefaultQrcodeWidget) => {
  const { render, inject } = props

  return new Promise((resolve, reject) => {
    new QRCode(CreateImage(), {
      text: inject.url.value || inject.url.default,
      width: render.width,
      height: render.width,
      onRenderingEnd: (_: any, dataURL: string) => resolve(dataURL)
    })
  }).then(async (dataURL: any) => {
    const image = await LoadImage(dataURL)
    return new Konva.Image({
      x: render.x,
      y: render.y,
      width: render.width,
      height: render.width,
      image: image
    })
  })
}
