import PlayerSocket, { Message } from './PlayerSocket'
import {
  DotPoint,
  ErrorCode,
  PathPoint,
  PositionType,
  RotationOption,
  ScaleOption
} from './Interfaces'

class HapticPlayer {
  socket: PlayerSocket;
  constructor() {
    this.socket = new PlayerSocket();
  }

  public addListener = (func: (msg: Message) => void) => {
    this.socket.addListener(func);
  };

  public turnOff = (key: string) :ErrorCode => {
    const request = {
      Submit :[{
        Type : 'turnOff',
        Key : key,
      }],
    };
    return this.socket.send(JSON.stringify(request));
  };

  public turnOffAll = () : ErrorCode => {
    const request = {
      Submit :[{
        Type : 'turnOffAll',
      }],
    };
    return this.socket.send(JSON.stringify(request));
  };

  public submitDot = (key: string,
                      pos: PositionType,
                      dotPoints: DotPoint[],
                      durationMillis: number) : ErrorCode => {
    if (dotPoints === undefined) {
      return ErrorCode.MESSAGE_INVALID;
    }

    for (let i = 0; i < dotPoints.length; i++) {
      const point = dotPoints[i];
      if (point.index < 0 || point.index >= 20) {
        return ErrorCode.MESSAGE_INVALID_INDEX;
      }

      if (point.intensity < 0 || point.intensity > 100) {
        return ErrorCode.MESSAGE_INVALID_INTENSITY;
      }
    }

    if (durationMillis <= 10 || durationMillis > 100000) {
      return ErrorCode.MESSAGE_INVALID_DURATION_MILLIS;
    }


    const request = {
      Submit :[{
        Type : 'frame',
        Key : key,
        Frame : {
          Position : pos,
          PathPoints: [],
          DotPoints : dotPoints,
          DurationMillis : durationMillis,
        },
      }],
    };
    return this.socket.send(JSON.stringify(request, (k, val) =>
      val.toFixed ? Number(val.toFixed(3)) : val
    ));
  };

  public submitPath = (key: string,
                pos: PositionType,
                pathPoints: PathPoint[],
                durationMillis: number) : ErrorCode => {
    if (pathPoints === undefined) {
      return ErrorCode.MESSAGE_INVALID;
    }

    for (let i = 0; i < pathPoints.length; i++) {
      const point = pathPoints[i];
      if (point.x < 0 || point.x > 1) {
        return ErrorCode.MESSAGE_INVALID_X;
      }
      if (point.y < 0 || point.y > 1) {
        return ErrorCode.MESSAGE_INVALID_Y;
      }
      if (point.intensity < 0 || point.intensity > 100) {
        return ErrorCode.MESSAGE_INVALID_INTENSITY;
      }
    }

    if (durationMillis <= 10 || durationMillis > 100000) {
      return ErrorCode.MESSAGE_INVALID_DURATION_MILLIS;
    }


    const request = {
      Submit :[{
        Type : 'frame',
        Key : key,
        Frame : {
          Position : pos,
          PathPoints : pathPoints,
          DotPoints : [],
          DurationMillis : durationMillis,
        },
      }],
    };
    return this.socket.send(JSON.stringify(request, (k, val) =>
      val.toFixed ? Number(val.toFixed(3)) : val
    ));
  }

  public registerFile = (key: string, json: string) : ErrorCode => {
    const jsonData = JSON.parse(json);
    const project = jsonData["project"];
    const request = {
      Register: [{
        Key: key,
        project,
      }]
    };
    return this.socket.send(JSON.stringify(request));
  }

  public submitRegistered = (key: string) : ErrorCode => {
    const request = {
      Submit :[{
        Type : 'key',
        Key : key,
      }],
    };

    return this.socket.send(JSON.stringify(request));
  }

  public submitRegisteredWithScaleOption = (key: string, scaleOption: ScaleOption) : ErrorCode => {
    const request = {
      Submit :[{
        Type : 'key',
        Key : key,
        Parameters : {
          scaleOption,
        }
      }],
    };

    return this.socket.send(JSON.stringify(request));
  }

  public submitRegisteredWithRotationOption = (key: string, rotationOption: RotationOption) : ErrorCode => {

    if (rotationOption.offsetAngleX < 0 || rotationOption.offsetAngleX > 360) {
      return ErrorCode.MESSAGE_INVALID_ROTATION_X;
    }
    if (rotationOption.offsetY < -0.5 || rotationOption.offsetY > 0.5) {
      return ErrorCode.MESSAGE_INVALID_ROTATION_X;
    }

    const request = {
      Submit :[{
        Type : 'key',
        Key : key,
        Parameters : {
          rotationOption,
        }
      }],
    };

    return this.socket.send(JSON.stringify(request));
  }
}

export default HapticPlayer;
