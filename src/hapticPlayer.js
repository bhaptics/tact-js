import Tacsocket from './Tacsocket';
import EventEmitter from './EventEmitter';

export default class hapticPlayer extends EventEmitter{
    constructor() {
        super();
        this.socket = new Tacsocket();
        this.handlers = [];
        this.message = {};

        this.socket.on('change', (message) => {
            this.message = message;
            this.emit('change', this.message);
        });
    }

    turnOff(position) {
        var request = {
            Submit :[ {
                Type : 'turnOff',
                Key : position
            }]
        };
        this.socket.send(JSON.stringify(request));
    };

    turnOffAll() {
        var request = {
            Submit :[ {
                Type : 'turnOffAll'
            }]
        };
        this.socket.send(JSON.stringify(request));
    };

    submitDot (key, pos, dotPoints, durationMillis) {
        var request = {
            Submit :[ {
                Type : 'frame',
                Key : key,
                Frame : {
                    Position : pos,
                    PathPoints: [],
                    DotPoints : dotPoints,
                    DurationMillis : durationMillis
                }
            }]
        };
        this.socket.send(JSON.stringify(request, function(key, val) {
            return val.toFixed ? Number(val.toFixed(3)) : val;
        }));
    };

    submitPath(key, pos, pathPoints, durationMillis) {
        var request = {
            Submit :[ {
                Type : 'frame',
                Key : key,
                Frame : {
                    Position : pos,
                    PathPoints : pathPoints,
                    DotPoints : [],
                    DurationMillis : durationMillis
                }
            }]
        };
        this.socket.send(JSON.stringify(request, (key, val) => {
            return val.toFixed ? Number(val.toFixed(3)) : val;
        }));
    };
}


