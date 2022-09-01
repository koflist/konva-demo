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
  width: number
  height?: number
  rotation: number
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
  public config: TConfig
  public shape!: TShape
  public renderPromise: Promise<this>

  constructor(config: TConfig) {
    this.config = config

    this.renderPromise = Promise.resolve()
      .then(() => this.createShape())
      .then((shape: TShape) => {
        this.shape = shape
        this.shape.setAttr("widget", this)
        return this.shape
      })
      .then((shape) => this.renderShape(shape, this.config))
      .then(() => this)
      .catch((error) => {
        console.error(error)
        return this
      })
  }

  public get type(): T {
    return this.config.type
  }

  public renderFinish(): Promise<this> {
    return this.renderPromise
  }

  public fromObject(config: TConfig): Promise<void> {
    this.config = { ...config }

    if (!this.shape) {
      return Promise.reject(`widget is not created yet.`)
    }

    return this.renderShape(this.shape, this.config).catch((error) => {
      console.error("fromObject error:")
      console.error(error)
    })
  }

  /**
   * @func toObject
   * @name abstract
   * @desc 需要实现渲染的导出
   */
  public abstract toObject(): TConfig

  /**
   * @func createShape
   * @name abstract
   * @desc 需要实现生成的图形，会自动在构造函数中调用
   */
  protected abstract createShape(): TShape

  /**
   * @func renderShape
   * @name abstract
   * @desc 需要实现图形的渲染，会自动在构造函数中调用|更新渲染中调用
   */
  protected abstract renderShape(shape: TShape, config: TConfig): Promise<void>
}
