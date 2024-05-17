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
  GloveL = 'GloveL',
  GloveR = 'GloveR',
}