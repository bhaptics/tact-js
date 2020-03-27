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
      case ErrorCode.SUCCESS:
        return 'Success';
    }
  }
}

export {
  DotPoint, PathPoint, ScaleOption, RotationOption, PositionType, ErrorCode, TactJsUtils
}
