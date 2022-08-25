import Konva from "konva"

export enum WidgetKind {
  base,
  avatar,
  qrcode,
  text
}

// Widget.Render 渲染定义
export type RenderType<ExtraRender = unknown> = {
  x: number
  y: number
} & ExtraRender

// Widget.Inject: 数据定义
export type InjectType<T> = {
  [K in keyof T]: T[K]
}

// Widget.Type 定义
export type WidgetConfig<ExtraRender = unknown, ExtraInject = unknown> = {
  render: RenderType<ExtraRender>
  inject: InjectType<ExtraInject>
}

// Widget.Class 定义
export abstract class BaseWidget<
  Config extends WidgetConfig = WidgetConfig,
  Shape extends Konva.Shape | Konva.Group = Konva.Shape
> {
  // property
  public readonly type: WidgetKind
  public readonly config: Config
  public shape: Shape | null = null
  public promiseRender: Promise<Shape>

  constructor(type: WidgetKind, config: Config) {
    this.type = type
    this.config = config

    this.promiseRender = this.renderShape().then((shape: Shape) => {
      this.shape = shape
      return shape
    })
  }

  renderFinish(): Promise<Shape> {
    return this.promiseRender
  }

  get rendered(): boolean {
    return !!this.shape
  }

  // 渲染函数会在构造函数中调用,在renderFinish中通知渲染结果
  protected abstract renderShape(): Promise<Shape>
}
