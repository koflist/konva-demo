import QRCode from "easyqrcodejs"
import { Image as KonvaImage } from "konva/lib/shapes/Image"
import { CreateImage, LoadImage } from "../../pages/poster/util"
import { BaseWidget, WidgetConfig, WidgetType } from "./base"

type ExtraRender = {
  width: number
}
type ExtraInject = {
  url: string
  query: string[]
}
export type QrcodeWidgetConfig = WidgetConfig<WidgetType.qrcode, ExtraRender, ExtraInject>

// Widget.Qrcode
export class QrcodeWidget extends BaseWidget<WidgetType.qrcode, QrcodeWidgetConfig, KonvaImage> {
  constructor(config: QrcodeWidgetConfig) {
    super(config)
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

  public override async renderShape() {
    const { render } = this.config

    const dataURL = await this.createQrcode()
    const image = await LoadImage(dataURL)

    return new KonvaImage({
      x: render.x,
      y: render.y,
      width: render.width,
      height: render.width,
      image: image
    })
  }

  public override toObject(): QrcodeWidgetConfig {
    return this.shape
      ? {
          type: this.type,
          inject: this.config.inject,
          render: {
            x: this.shape.x(),
            y: this.shape.y(),
            width: this.shape.width() * this.shape.scaleX()
          }
        }
      : this.config
  }
}
