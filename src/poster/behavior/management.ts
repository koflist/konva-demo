import { debounce } from "lodash-es"

import KonvaPoster from "../konva"
import { WidgetConfig, WidgetKind } from "../widgets"
import BaseBehavior from "./base"

export default class ManagementBehvior extends BaseBehavior {
  private changeHandler: Function
  // private listeners: EventFunc[]

  constructor(poster: KonvaPoster) {
    super(poster)

    // this.listeners = []
    this.changeHandler = debounce((widget: WidgetKind) => this.output(widget), 200)
  }

  public override attach(widget: WidgetKind) {
    widget.shape.on("scaleXChange scaleYChange xChange yChange", () => {
      this.changeHandler(widget)
    })
  }

  public listen() {}

  // public trigger: EventFunc = (type, payload) => {
  //   switch (type) {
  //     case EventType.append:
  //       return this.append(payload)
  //     case EventType.remove:
  //       return this.remove(payload)
  //     case EventType.update:
  //       return this.update(payload)
  //   }
  // }

  private append(config: WidgetConfig) {
    this.poster.appnedWidget(config)
  }

  private remove(widgetId: number) {
    this.poster.removeWidget({ id: widgetId })
  }

  private output(widget: WidgetKind) {
    const widgetConfig = widget.toObject()
    // for (const func of this.listeners) {
    //   // func(EventType.output, widgetConfig)
    // }
  }

  private update(config: WidgetConfig): void {
    const widget = this.poster.renderedWidgets.find((it) => {
      return it.config.id === config.id && it.config.type === config.type
    })

    if (!widget || !config.id) {
      console.warn(`cannot find widget, config id : ${config.id}`)
      return
    }

    // TODO: TS体操给我整麻了 先用any吧
    widget.fromObject(config as any)
  }
}
