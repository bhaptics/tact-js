import HapticPlayer from './HapticPlayer'
import { DotPoint, PathPoint, ScaleOption, RotationOption, PositionType, ErrorCode } from './Interfaces';

const tactJs = new HapticPlayer();

export default tactJs;

export {
  DotPoint, PathPoint, ScaleOption, RotationOption, PositionType, ErrorCode
}
