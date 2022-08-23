export enum WidgetType {
  avatar,
  qrcode
}

export interface IBaseRender {
  x: number
  y: number
  type: WidgetType
}

export type BaseDataType = {
  value?: string
  default: string
}
export type BaseRuntimeData<T extends string[]> = {}

const a: BaseRuntimeData<["av"]> = {
  0: {
    value: "123",
    default: "223"
  }
}

export interface IAvatarRender extends IBaseRender {
  r: number
}

export interface IAvatarRuntimeData {
  avatar: {
    value?: string
    default: string
  }
}

export type TAvatarRender = IAvatarRender & { type: WidgetType.avatar }
export type TAvatarRuntimData = BaseRuntimeData<["avatar"]>
