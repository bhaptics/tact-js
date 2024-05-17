import PlayerSocket, { Message } from './PlayerSocket'
import {
  DotPoint,
  PathPoint,
  PositionType,
  RotationOption,
  ScaleOption
} from './models/Interfaces'
import ErrorCode from "./models/ErrorCode";

class BhapticsPlayer {
  public registeredKeys: string[] = [];
  private socket?: PlayerSocket;

  public addListener = (func: (msg: Message) => void) => {
    if (!this.socket) {
      console.log('BhapticsSdk not initialized');
      return;
    }

    this.socket.addListener(func);
  };

  public initialize = (appId: string, appName: string) => {
    if (appId === undefined) {
      throw new Error('App ID is required');
    }
    if (appName === undefined) {
      throw new Error('App Name is required');
    }
    if (this.socket) {
      console.log('initialize called twice');
      return;
    }

    this.socket = new PlayerSocket(appId, appName);
    this.addListener((msg => {
      if (msg.message?.RegisteredKeys) {
        this.registeredKeys = msg.message.RegisteredKeys;
      }
    }))

  }

  public turnOff = (key: string) :ErrorCode => {
    const request = {
      Submit :[{
        Type : 'turnOff',
        Key : key,
      }],
    };
    if (!this.socket) {
      return ErrorCode.MESSAGE_NOT_INITIALIZED;
    }

    return this.socket.send(JSON.stringify(request));
  };

  public turnOffAll = () : ErrorCode => {
    const request = {
      Submit :[{
        Type : 'turnOffAll',
      }],
    };
    if (!this.socket) {
      return ErrorCode.MESSAGE_NOT_INITIALIZED;
    }
    return this.socket.send(JSON.stringify(request));
  };

  public submitDot = (key: string,
                             pos: PositionType,
                             dotPoints: DotPoint[],
                             durationMillis: number) : ErrorCode => {
    if (!this.socket) {
      return ErrorCode.MESSAGE_NOT_INITIALIZED;
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

          if (point.index < 0 || point.index >= 6) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_ARM;
          }
          break;
        case PositionType.Head:

          if (point.index < 0 || point.index >= 6) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_HEAD;
          }
          break;
        case PositionType.VestBack:
        case PositionType.VestFront:

          if (point.index < 0 || point.index >= 20) {
            return ErrorCode.MESSAGE_INVALID_DOT_INDEX_VEST;
          }
          break;
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

    return this.socket.send(JSON.stringify(request, (_, val) =>
      val.toFixed ? Number(val.toFixed(3)) : val
    ));
  };

  public submitPath = (key: string,
                              pos: PositionType,
                              pathPoints: PathPoint[],
                              durationMillis: number) : ErrorCode => {

    if (!this.socket) {
      return ErrorCode.MESSAGE_NOT_INITIALIZED;
    }

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
    return this.socket.send(JSON.stringify(request, (_, val) =>
      val.toFixed ? Number(val.toFixed(3)) : val
    ));
  }

  public registerFile = (key: string, json: string) : ErrorCode => {
    if (!this.socket) {
      throw new Error('BhapticsSdk not initialized');
    }

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
    if (!this.socket) {
      return ErrorCode.MESSAGE_NOT_INITIALIZED;
    }

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
    if (!this.socket) {
      return ErrorCode.MESSAGE_NOT_INITIALIZED;
    }

    if (this.registeredKeys.find(v => v === key) === undefined) {
      return ErrorCode.MESSAGE_NOT_REGISTERED_KEY;
    }

    if (scaleOption.intensity < 0.2 || scaleOption.intensity > 5) {
      return ErrorCode.MESSAGE_INVALID_SCALE_INTENSITY_RATIO;
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
    if (!this.socket) {
      return ErrorCode.MESSAGE_NOT_INITIALIZED;
    }

    if (this.registeredKeys.find(v => v === key) === undefined) {
      return ErrorCode.MESSAGE_NOT_REGISTERED_KEY;
    }

    if (rotationOption.offsetAngleX < 0 || rotationOption.offsetAngleX > 360) {
      return ErrorCode.MESSAGE_INVALID_ROTATION_X;
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

export default BhapticsPlayer;