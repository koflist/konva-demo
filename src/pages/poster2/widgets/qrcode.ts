import QRCode from "easyqrcodejs"
import Konva from "konva"
import { CreateImage, LoadImage } from "../util"
import { BaseWidget, WidgetConfig, WidgetKind } from "./types"

type ExtraRender = {
  width: number
}
type ExtraInject = {
  url: string
  query: string[]
}
export type QrcodeWidgetConfig = WidgetConfig<ExtraRender, ExtraInject>

export default class QrcodeWidget extends BaseWidget<QrcodeWidgetConfig, Konva.Image> {
  constructor(config: QrcodeWidgetConfig) {
    super(WidgetKind.qrcode, config)
  }

  private createQrcode(): Promise<string> {
    const { render, inject } = this.config

    return new Promise((resolve, reject) => {
      new QRCode(CreateImage(), {
        text: inject.url,
        width: render.width,
        height: render.width,
        onRenderingEnd: (_: any, dataURL: string) => resolve(dataURL)
      })
    })
  }

  override async renderShape() {
    const { render } = this.config

    const dataURL = await this.createQrcode()
    const image = await LoadImage(dataURL)

    return new Konva.Image({
      x: render.x,
      y: render.y,
      width: render.width,
      height: render.width,
      image: image
    })
  }
}
