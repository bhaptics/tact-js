export enum PositionType {
  Vest = 'Vest',
  ForearmL = 'ForearmL',
  ForearmR = 'ForearmR',
  Head = 'Head',
  HandL = 'HandL',
  HandR = 'HandR',
  FootL = 'FootL',
  FootR = 'FootR',
  GloveL = 'GloveL',
  GloveR = 'GloveR',
}

export class PositionUtils {
  static positionToType(position: number): PositionType {
    switch (position) {
      case 0:
        return PositionType.Vest;
      case 1:
        return PositionType.ForearmL;
      case 2:
        return PositionType.ForearmR;
      case 3:
        return PositionType.Head;
      case 4:
        return PositionType.HandL;
      case 5:
        return PositionType.HandR;
      case 6:
        return PositionType.FootL;
      case 7:
        return PositionType.FootR;
      case 8:
        return PositionType.GloveL;
      case 9:
        return PositionType.GloveR;
      default:
        return PositionType.Vest;
    }
  }

  static enumToPosition(position: PositionType): number {
    switch (position) {
      case PositionType.Vest:
        return 0;
      case PositionType.ForearmL:
        return 1;
      case PositionType.ForearmR:
        return 2;
      case PositionType.Head:
        return 3;
      case PositionType.HandL:
        return 4;
      case PositionType.HandR:
        return 5;
      case PositionType.FootL:
        return 6;
      case PositionType.FootR:
        return 7;
      case PositionType.GloveL:
        return 8;
      case PositionType.GloveR:
        return 9;
      default:
        return 10;
    }
  }
}
