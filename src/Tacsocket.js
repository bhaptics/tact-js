
let defaultURL= 'ws://localhost:15881/v2/feedbacks';
let status = {
    connecting : 'Connecting',
    connected : 'Connected',
    disconnect : 'Disconnected'
};

export default class Tacsocket {
    constructor() {
        this.handlers = [];
        this.message = {};
        this.websocketClient;
        this.currentStatus = status.disconnect;
        this.connect();
    }

    publish(event, args) {
        this.handlers.forEach((topic) => {
            if (topic.event === event) {
              topic.handler(args)
            }
        });
    }

    on (event, handler, context) {
      if (typeof context === 'undefined') { context = handler; }
      this.handlers.push({ event: event, handler: handler.bind(context) });

        this.publish('change', {
            status: this.currentStatus,
            message: this.message
        });
    };

    connect() {
        try  {
            this.websocketClient = new WebSocket(defaultURL);
        } catch (e) {
            console.log(e);
            return;
        }

        this.websocketClient.onopen = () => {
            this.currentStatus = status.connected;
            this.publish('change', {
                status: this.currentStatus,
                message: this.message
            });
        };

        this.websocketClient.onmessage = (result) => {
            if (JSON.stringify(this.message) === result.data) {
                return;
            }

            this.message = JSON.parse(result.data);
            this.publish('change', {
                status: this.currentStatus,
                message: this.message
            });
        };

        this.websocketClient.onclose = (event) => {
            this.currentStatus = status.disconnect;
            this.publish('change', {
                status: this.currentStatus,
                message: this.message
            });
            setTimeout(function(){
                this.connect();
            }, 5000);
        };

        this.currentStatus = status.connecting;
        this.publish('change', {
            status: this.currentStatus,
            message: this.message
        });
    };

    send(message) {
        if (message === undefined) {
            return;
        }

        if (this.websocketClient === undefined) {
            return;
        }

        if (this.currentStatus !== status.connected) {
            return;
        }

        try {
            this.websocketClient.send(message);
        } catch (e) {
        }
    };
}
