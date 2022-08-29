import { Node } from "konva/lib/Node"

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
  id?: number
  type: T
  render: RenderType<ExtraRender>
  inject: InjectType<ExtraInject>
}

// Widget.Shape 定义
export type WidgetShape = Node

// 抽象类 Widget.Class 定义
export abstract class BaseWidget<
  T extends WidgetType,
  TConfig extends WidgetConfig<T>,
  TShape extends WidgetShape
> {
  // property
  public readonly config: TConfig
  public readonly type: T
  public shape: TShape | null
  public renderPromise: Promise<this>

  constructor(config: TConfig) {
    this.config = config
    this.type = config.type
    this.shape = null

    this.renderPromise = this.renderShape()
      .then((shape: TShape) => {
        this.shape = shape
        this.shape.setAttr("widget", this)
        return this
      })
      .catch((error) => {
        this.shape = null
        console.log(error)
        return this
      })
  }

  public renderFinish(): Promise<this> {
    return this.renderPromise
  }

  /**
   * @func toObject
   * @name abstract
   * @desc 需要实现渲染的导出
   */
  public abstract toObject(): TConfig

  /**
   * @func renderShape
   * @name abstract
   * @desc 需要实现组件的渲染，会自动在构造函数中调用
   */
  protected abstract renderShape(): Promise<TShape>
}
