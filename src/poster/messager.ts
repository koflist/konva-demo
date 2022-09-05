const EvnetList = {
  parentReady: "parentReady",
  childReady: "childReady",
  output: "output",
  update: "update",
  remove: "remove",
  append: "append"
} as const

enum EventEnum {
  append = "append"
}

// 事件类型类型
export type EventType = typeof EvnetList

// 事件回调类型
export type EventCallback = (payload?: any) => void

export interface IMessager {
  trigger: (event: keyof EventType, payload?: any) => void
  listen: (event: keyof EventType, callback: EventCallback) => void
}

export class Messager implements IMessager {
  static readonly Parent = "parent"
  static readonly Child = "child"

  private type: typeof Messager.Parent | typeof Messager.Child
  private tasks: Function[]
  private onceListeners: Record<EventEnum, EventCallback[]>
  private listeners: { -readonly [K in keyof EventType]?: EventCallback[] }

  constructor(type: typeof Messager.Parent | typeof Messager.Child) {
    this.type = type
    this.tasks = []
    this.listeners = {}
    this.onceListeners = {EventEnum.}
    this.init()
  }

  private init() {
    if (this.type === Messager.Parent) {
      this.trigger("childReady")
      this.listen("parentReady", () => {})
    }
    if (this.type === Messager.Child) {
      this.listen("childReady", () => {
        this.trigger("parentReady")
      })
    }
  }

  public once(event: string, callback: Function) {

  }

  public on(event: string, callback: Function) {

  }

  public emit(event: string, payload: any) {
    if(this.type == )
  }

  public trigger(event: keyof EventType, payload?: any) {}

  public listen(event: keyof EventType, callback: EventCallback) {
    if (event in this.listeners) {
      this.listeners[event]?.push(callback)
    } else {
      this.listeners[event] = [callback]
    }
  }
}
