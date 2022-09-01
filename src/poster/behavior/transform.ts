import { Layer } from "konva/lib/Layer"
import { Box, Transformer, TransformerConfig } from "konva/lib/shapes/Transformer"

import KonvaPoster from "../konva"
import { WidgetKind, WidgetType } from "../widgets"
import BaseBehaivor from "./base"

const BaseTransformerConfig: TransformerConfig = {
  // style
  anchorSize: 9,
  anchorStrokeWidth: 1,
  anchorStroke: "#409eff",
  anchorFill: "white",
  borderStroke: "#409eff",
  borderFill: "white",
  borderStrokeWidth: 2,
  // config
  padding: 10,
  keepRatio: true,
  flipEnabled: false,
  rotationSnaps: [0, 90, 180, 270],
  enabledAnchors: ["top-left", "bottom-left", "top-right", "bottom-right"]
}

export default class TransformBehvior extends BaseBehaivor {
  private layer: Layer

  private currentTransformer: Transformer | null
  private rectTransformer: Transformer
  private textTransformer: Transformer

  constructor(poster: KonvaPoster) {
    super(poster)

    this.currentTransformer = null
    this.layer = new Layer()
    this.poster.stage.add(this.layer)

    this.rectTransformer = new Transformer({
      ...BaseTransformerConfig,
      boundBoxFunc: (...args) => this.transformBoundary(...args)
    })

    this.textTransformer = new Transformer({
      ...BaseTransformerConfig,
      enabledAnchors: ["bottom-center", "middle-right"],
      boundBoxFunc: (...args) => this.transformBoundary(...args)
    })

    this.layer.add(this.rectTransformer, this.textTransformer)

    this.transformListening()
  }

  // 文字组件:不缩放|改变尺寸影响文字换行
  public override attach(widget: WidgetKind) {
    const { shape } = widget
    shape.on("transform", () => {
      shape.setAttrs({
        width: Math.max(shape.width() * shape.scaleX()),
        height: Math.max(shape.height() * shape.scaleY()),
        scaleX: 1,
        scaleY: 1
      })
    })
  }

  private transformBoundary(oldBox: Box, newBox: Box) {
    const minSize = 20

    const width = Math.abs(newBox.width)
    if (width > this.limitX / 2 || width < minSize) {
      return oldBox
    }

    const height = Math.abs(newBox.height)
    if (height > this.limitY / 2 || height < minSize) {
      return oldBox
    }

    const { x, y } = newBox
    if (x < 0 || y < 0) {
      return oldBox
    }

    return newBox
  }

  private transformBlur() {
    if (this.currentTransformer) {
      this.currentTransformer.nodes([])
      this.currentTransformer.hide()
    }
  }

  private transformFocus(widget: WidgetKind) {
    if (this.currentTransformer && widget.shape) {
      this.currentTransformer.nodes([widget.shape])
      this.currentTransformer.show()
    }
  }

  private transformListening() {
    const { stage, backgroundShape } = this.poster

    stage.add(this.layer)
    stage.on("pointerdown", (event) => {
      const shape = event.target

      // 点击背景
      if (shape === backgroundShape) {
        this.transformBlur()
        return
      }

      // 点击组件
      const widget = shape.getAttr("widget") as WidgetKind | undefined
      if (widget) {
        this.transformBlur()

        if (widget.type === WidgetType.text) {
          this.currentTransformer = this.textTransformer
        } else {
          this.currentTransformer = this.rectTransformer
        }

        this.transformFocus(widget)
      }
    })
  }
}
