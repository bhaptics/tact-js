import Tacsocket from './Tacsocket';
import EventEmitter from './EventEmitter';

export default class hapticPlayer extends EventEmitter {
    constructor() {
      super();
      this.socket = new Tacsocket();
      this.message = {};

      this.socket.on('change', (message) => {
        this.message = message;
        this.emit('change', this.message);
      });
    }

    turnOff(position) {
      const request = {
        Submit :[{
          Type : 'turnOff',
          Key : position,
        }],
      };
      this.socket.send(JSON.stringify(request));
    }

    turnOffAll() {
      const request = {
        Submit :[{
          Type : 'turnOffAll',
        }],
      };
      this.socket.send(JSON.stringify(request));
    }

    submitDot(key, pos, dotPoints, durationMillis) {
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
    }

    submitPath(key, pos, pathPoints, durationMillis) {
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
}
