import HapticPlayer from './HapticPlayer'
import { DotPoint, PathPoint, ScaleOption, RotationOption, PositionType, ErrorCode } from './Interfaces';

const tactJs = new HapticPlayer();

export default tactJs;

class TactJsUtils {
  public static convertErrorCodeToString = (error: ErrorCode): string => {
    switch (error) {
      case ErrorCode.CONNECTION_NOT_ESTABLISHED:
        return 'Connection is not established.'
      case ErrorCode.FAILED_TO_SEND_MESSAGE:
        return 'Failed to send a request to the bHaptics Player'
      case ErrorCode.MESSAGE_NOT_DEFINED:
        return 'Message is not defined';
      case ErrorCode.MESSAGE_INVALID:
        return 'Invalid input: Unknown';
      case ErrorCode.MESSAGE_INVALID_DURATION_MILLIS:
        return 'Invalid: durationMillis [20ms ~ 100,000ms]';
      case ErrorCode.MESSAGE_INVALID_DOT_INDEX_VEST:
        return 'Invalid: VestFront/Back index should be [0, 19]';
      case ErrorCode.MESSAGE_INVALID_DOT_INDEX_ARM:
        return 'Invalid: ArmLeft/Right index should be [0, 5]';
      case ErrorCode.MESSAGE_INVALID_DOT_INDEX_HEAD:
        return 'Invalid: Head index should be [0, 5]';
      case ErrorCode.MESSAGE_INVALID_INTENSITY:
        return 'Invalid: intensity should be [0, 100]';
      case ErrorCode.MESSAGE_INVALID_X:
        return 'Invalid: x should be [0, 1]';
      case ErrorCode.MESSAGE_INVALID_Y:
        return 'Invalid: y should be [0, 1]';
      case ErrorCode.MESSAGE_INVALID_ROTATION_X:
        return 'Invalid: rotationOffsetX should be [0, 360]';
      case ErrorCode.MESSAGE_INVALID_ROTATION_Y:
        return 'Invalid: offsetY should be [-0.5, 0.5]';
      case ErrorCode.MESSAGE_INVALID_SCALE_INTENSITY_RATIO:
        return 'Invalid: intensity should be [0.2, 5]';
      case ErrorCode.MESSAGE_INVALID_SCALE_DURATION_RATIO:
        return 'Invalid: duration should be [0.2, 5]';
      case ErrorCode.MESSAGE_NOT_REGISTERED_KEY:
        return 'Invalid: key not registered';
      case ErrorCode.SUCCESS:
        return 'Success';
    }
  }
}

export {
  DotPoint, PathPoint, ScaleOption, RotationOption, PositionType, ErrorCode, TactJsUtils
}
