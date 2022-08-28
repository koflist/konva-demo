import Konva from "konva"

// Widget.Type 定义
export enum WidgetType {
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

// Widget.Inject 数据定义
export type InjectType<ExtraInject> = {
  [K in keyof ExtraInject]: ExtraInject[K]
}

// Widget.Config 定义
export type WidgetConfig<T extends WidgetType, ExtraRender = unknown, ExtraInject = unknown> = {
  type: T
  render: RenderType<ExtraRender>
  inject: InjectType<ExtraInject>
}

// Widget.Shape 定义
export type WidgetShape = Konva.Node

// 抽象类 Widget.Class 定义
export abstract class BaseWidget<
  T extends WidgetType,
  Config extends WidgetConfig<T>,
  Shape extends WidgetShape
> {
  // property
  public readonly config: Config
  public readonly type: WidgetType
  public shape: Shape | null = null
  public renderPromise: Promise<this>

  constructor(config: Config) {
    this.config = config
    this.type = config.type

    this.renderPromise = this.renderShape()
      .then((shape: Shape) => {
        this.shape = shape
        return this
      })
      .catch((error) => {
        console.log(error)
        return this
      })
  }

  public renderFinish(): Promise<this> {
    return this.renderPromise
  }

  public isMyShape(shape: WidgetShape): boolean {
    return this.shape === shape
  }

  // TODO: 导出当前时刻的渲染信息
  public toObject(): any {}

  // 渲染函数会在构造函数中调用,在renderFinish中通知渲染结果
  protected abstract renderShape(): Promise<Shape>
}
