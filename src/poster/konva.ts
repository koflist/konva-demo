import { Layer } from "konva/lib/Layer"
import { Image } from "konva/lib/shapes/Image"
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

  public backgroundShape: Image | null
  public renderedWidgets: WidgetKind[]

  private config: PosterConfig
  private renderPromise: Promise<void>

  constructor(config: PosterConfig) {
    this.config = config
    this.backgroundShape = null
    this.renderedWidgets = []

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

  public async renderFinsh() {
    return this.renderPromise
  }

  // 海报渲染(背景+组件列表)
  private async render(): Promise<void> {
    await this.renderBackground()
    await this.initRenderWidgets()
  }

  // 渲染 背景图
  private async renderBackground() {
    const bgImage = await LoadImage(this.config.background.url)
    const KonvaBgImage = new Image({
      x: 0,
      y: 0,
      image: bgImage,
      width: this.config.background.width,
      height: this.config.background.height
    })

    this.backgroundShape = KonvaBgImage
    this.layer.add(KonvaBgImage)
  }

  // 初始化渲染组件列表
  private async initRenderWidgets() {
    const p: Promise<void>[] = this.config.widgets.map((config) => this.appnedWidget(config))
    return Promise.allSettled(p)
  }

  // 渲染 widget 并添加到 poster上
  public appnedWidget(config: WidgetConfig): Promise<void> {
    const widget = this.createWidget(config)

    if (!widget) {
      return Promise.reject("没有找到指定的widget")
    }

    return widget
      .renderFinish()
      .then((widget) => {
        if (widget.shape) {
          this.layer.add(widget.shape)
          this.renderedWidgets.push(widget)
        } else {
          throw new Error("没有渲染成功")
        }
      })
      .catch((error) => {
        console.log(error)
        return Promise.reject("渲染失败")
      })
  }

  // 创建 widget
  public createWidget(config: WidgetConfig): WidgetKind | null {
    const type = config.type
    switch (type) {
      case WidgetType.avatar:
        return new AvatarWidget(config)
      case WidgetType.qrcode:
        return new QrcodeWidget(config)
      case WidgetType.text:
        return new TextWidget(config)
      default:
        return null
    }
  }

  // 删除 widget
  public removeWidget(query: { widget?: WidgetKind; id?: number } = {}) {
    let index: number = -1

    if (query.widget) {
      index = this.renderedWidgets.findIndex((it) => it === query.widget)
    }
    if (query.id) {
      index = this.renderedWidgets.findIndex((it) => it.config.id === query.id)
    }

    if (index >= 0) {
      this.renderedWidgets[index].shape?.destroy()
      this.renderedWidgets.splice(index, 1)
    }
  }
}
