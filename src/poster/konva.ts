import { Layer } from "konva/lib/Layer"
import { Image as KonvaImage } from "konva/lib/shapes/Image"
import { Stage } from "konva/lib/Stage"

import { LoadImage } from "../pages/poster/util"
import {
  AvatarWidget,
  QrcodeWidget,
  TextWidget,
  WidgetConfig,
  WidgetKind,
  WidgetType
} from "./widgets"

export type PosterConfig = {
  background: {
    url: string
    width: number
    height: number
  }
  widgets: WidgetConfig[]
}

export default class KonvaPoster {
  public readonly stage: Stage
  public readonly layer: Layer

  public backgroundShape: KonvaImage | null
  public childrenWidgets: WidgetKind[]

  private config: PosterConfig
  private renderPromise: Promise<void>

  constructor(config: PosterConfig) {
    this.config = config
    this.backgroundShape = null
    this.childrenWidgets = []

    this.layer = new Layer({
      name: "rootLayer"
    })
    this.stage = new Stage({
      name: "rootStage",
      container: document.createElement("div"),
      width: this.config.background.width,
      height: this.config.background.height
    })

    this.stage.add(this.layer)
    this.renderPromise = this.render()
  }

  private async render(): Promise<void> {
    await this.renderBackground()
    await this.renderWidgets()
  }

  private async renderBackground() {
    const bgImage = await LoadImage(this.config.background.url)
    const KonvaBgImage = new KonvaImage({
      x: 0,
      y: 0,
      image: bgImage,
      width: this.config.background.width,
      height: this.config.background.height
    })

    this.backgroundShape = KonvaBgImage
    this.layer.add(KonvaBgImage)
  }

  private async renderWidgets() {
    const p: Promise<WidgetKind>[] = this.config.widgets.map((config) => this.renderWidget(config))

    return Promise.allSettled(p).then((statuses) => {
      for (const item of statuses) {
        if (item.status === "fulfilled") {
          const widget = item.value
          if (widget.shape) {
            this.layer.add(widget.shape)
            this.childrenWidgets.push(widget)
          }
        }
      }
    })
  }

  private async renderWidget(widgetConfig: WidgetConfig): Promise<WidgetKind> {
    const type = widgetConfig.type
    switch (type) {
      case WidgetType.avatar:
        return new AvatarWidget(widgetConfig).renderFinish()
      case WidgetType.qrcode:
        return new QrcodeWidget(widgetConfig).renderFinish()
      case WidgetType.text:
        return new TextWidget(widgetConfig).renderFinish()
      default:
        return Promise.reject(`cannot find widget type of: ${type}`)
    }
  }

  public async renderFinsh() {
    return this.renderPromise
  }

  // public async attach(): Promise<void> {
  //   attachDraggable()
  // }
}
