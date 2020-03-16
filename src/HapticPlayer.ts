
import PlayerSocket, {Message} from './PlayerSocket';
import { DotPoint, PathPoint, PositionType, RotationOption, ScaleOption } from './Interfaces'

class HapticPlayer {
  socket: PlayerSocket;
  constructor() {
    this.socket = new PlayerSocket();
  }

  public addListener = (func: (msg: Message) => void) => {
    this.socket.addListener(func);
  };

  public turnOff = (position: PositionType) => {
    const request = {
      Submit :[{
        Type : 'turnOff',
        Key : position,
      }],
    };
    this.socket.send(JSON.stringify(request));
  };

  public turnOffAll = () => {
    const request = {
      Submit :[{
        Type : 'turnOffAll',
      }],
    };
    this.socket.send(JSON.stringify(request));
  };

  public submitDot = (key: string,
                      pos: PositionType,
                      dotPoints: DotPoint[],
                      durationMillis: number) : void => {
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
    this.socket.send(JSON.stringify(request, (k, val) =>
      val.toFixed ? Number(val.toFixed(3)) : val
    ));
  };

  public submitPath = (key: string,
                pos: PositionType,
                pathPoints: PathPoint[],
                durationMillis: number) => {
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
    this.socket.send(JSON.stringify(request, (k, val) =>
      val.toFixed ? Number(val.toFixed(3)) : val
    ));
  }

  public registerFile = (key: string, json: string) => {
    const jsonData = JSON.parse(json);
    const project = jsonData["project"];
    const request = {
      Register: [{
        Key: key,
        project,
      }]
    };
    this.socket.send(JSON.stringify(request));

  }

  public submitRegistered = (key: string) : void => {
    const request = {
      Submit :[{
        Type : 'key',
        Key : key,
      }],
    };

    this.socket.send(JSON.stringify(request));
  }

  public submitRegisteredWithScaleOption = (key: string, scaleOption: ScaleOption) : void => {
    const request = {
      Submit :[{
        Type : 'key',
        Key : key,
        Parameters : {
          scaleOption,
        }
      }],
    };

    this.socket.send(JSON.stringify(request));
  }

  public submitRegisteredWithRotationOption = (key: string, rotationOption: RotationOption) : void => {
    const request = {
      Submit :[{
        Type : 'key',
        Key : key,
        Parameters : {
          rotationOption,
        }
      }],
    };

    this.socket.send(JSON.stringify(request));
  }
}

export default HapticPlayer;
