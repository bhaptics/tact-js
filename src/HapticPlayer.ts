
import PlayerSocket, {Message} from './PlayerSocket';
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
