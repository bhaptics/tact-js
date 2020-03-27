export interface DotPoint {
  index: number;
  intensity: number;
}

export interface PathPoint {
  x: number;
  y: number;
  intensity: number;
}


export interface ScaleOption {
  intensity: number;
  duration: number;
}


export interface RotationOption {
  offsetAngleX: number;
  offsetY: number;
}


export enum PositionType {
  VestFront = 'VestFront',
  VestBack = 'VestBack',
  Head = 'Head',
  ForearmL = 'ForearmL',
  ForearmR = 'ForearmR',
}


export enum ErrorCode {
  SUCCESS,
  MESSAGE_NOT_DEFINED,
  CONNECTION_NOT_ESTABLISHED,
  FAILED_TO_SEND_MESSAGE,
}

