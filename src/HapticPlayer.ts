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
  registeredKeys: string[] = []
  socket: PlayerSocket;
  constructor() {
    this.socket = new PlayerSocket();
    this.addListener((msg => {
      if (msg.message.RegisteredKeys) {
        this.registeredKeys = msg.message.RegisteredKeys;
      }
    }))
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
    if (isNaN(durationMillis)) {
      return ErrorCode.MESSAGE_INVALID_DURATION_MILLIS;
    }

    if (durationMillis < 20 || durationMillis > 100000) {
      return ErrorCode.MESSAGE_INVALID_DURATION_MILLIS;
    }

    if (dotPoints === undefined) {
      return ErrorCode.MESSAGE_INVALID;
    }

    for (let i = 0; i < dotPoints.length; i++) {
      const point = dotPoints[i];


      switch (pos) {
        case PositionType.ForearmL:
        case PositionType.ForearmR:
          if (isNaN(point.index)) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_ARM;
          }

          if (point.index < 0 || point.index >= 6) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_ARM;
          }
          break;
        case PositionType.Head:
          if (isNaN(point.index)) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_HEAD;
          }

          if (point.index < 0 || point.index >= 6) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_HEAD;
          }
          break;
        case PositionType.VestBack:
        case PositionType.VestFront:
          if (isNaN(point.index)) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_VEST;
          }

          if (point.index < 0 || point.index >= 20) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_VEST;
          }
          break;
      }

      if (isNaN(point.intensity)) {
        return ErrorCode.MESSAGE_INVALID_INTENSITY;
      }

      if (point.intensity < 0 || point.intensity > 100) {
        return ErrorCode.MESSAGE_INVALID_INTENSITY;
      }
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

    if (isNaN(durationMillis)) {
      return ErrorCode.MESSAGE_INVALID_DURATION_MILLIS;
    }

    if (durationMillis < 20 || durationMillis > 100000) {
      return ErrorCode.MESSAGE_INVALID_DURATION_MILLIS;
    }

    if (pathPoints === undefined) {
      return ErrorCode.MESSAGE_INVALID;
    }

    for (let i = 0; i < pathPoints.length; i++) {
      const point = pathPoints[i];

      if (isNaN(point.x)) {
        return ErrorCode.MESSAGE_INVALID_X;
      }

      if (isNaN(point.y)) {
        return ErrorCode.MESSAGE_INVALID_Y;
      }

      if (isNaN(point.intensity)) {
        return ErrorCode.MESSAGE_INVALID_INTENSITY;
      }

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
    if (this.registeredKeys.find(v => v === key) === undefined) {
      return ErrorCode.MESSAGE_NOT_REGISTERED_KEY;
    }


    const request = {
      Submit :[{
        Type : 'key',
        Key : key,
      }],
    };

    return this.socket.send(JSON.stringify(request));
  }

  public submitRegisteredWithScaleOption = (key: string, scaleOption: ScaleOption) : ErrorCode => {
    if (this.registeredKeys.find(v => v === key) === undefined) {
      return ErrorCode.MESSAGE_NOT_REGISTERED_KEY;
    }

    if (isNaN(scaleOption.intensity)) {
      return ErrorCode.MESSAGE_INVALID_SCALE_INTENSITY_RATIO;
    }

    if (scaleOption.intensity < 0.2 || scaleOption.intensity > 5) {
      return ErrorCode.MESSAGE_INVALID_SCALE_INTENSITY_RATIO;
    }

    if (isNaN(scaleOption.duration)) {
      return ErrorCode.MESSAGE_INVALID_SCALE_DURATION_RATIO;
    }

    if (scaleOption.duration < 0.2 || scaleOption.duration > 5) {
      return ErrorCode.MESSAGE_INVALID_SCALE_DURATION_RATIO;
    }

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
    if (this.registeredKeys.find(v => v === key) === undefined) {
      return ErrorCode.MESSAGE_NOT_REGISTERED_KEY;
    }

    if (isNaN(rotationOption.offsetAngleX)) {
      return ErrorCode.MESSAGE_INVALID_ROTATION_X;
    }

    if (rotationOption.offsetAngleX < 0 || rotationOption.offsetAngleX > 360) {
      return ErrorCode.MESSAGE_INVALID_ROTATION_X;
    }

    if (isNaN(rotationOption.offsetY)) {
      return ErrorCode.MESSAGE_INVALID_ROTATION_Y;
    }

    if (rotationOption.offsetY < -0.5 || rotationOption.offsetY > 0.5) {
      return ErrorCode.MESSAGE_INVALID_ROTATION_Y;
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
