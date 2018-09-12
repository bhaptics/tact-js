import EventEmitter from "./EventEmitter";

const defaultURL= 'ws://127.0.0.1:15881/v2/feedbacks';

const STATUS = {
  CONNECTING : 'Connecting',
  CONNECTED : 'Connected',
  DISCONNECT : 'Disconnected',
};


export default class Tacsocket extends EventEmitter {
  constructor(retryConnectTime) {
    super();
    this.handlers = [];
    this.message = {};
    this.DEFAULT_RETRY_CONNECT_TIME = 5000;
    this.retryConnectTime = retryConnectTime || this.DEFAULT_RETRY_CONNECT_TIME;
    this.currentStatus = STATUS.DISCONNECT;
    this.connect();
  }

  connect() {
    try  {
      this.websocketClient = new WebSocket(defaultURL);
    } catch (e) {
      // connection failed
      return;
    }

    this.websocketClient.onopen = () => {
      this.currentStatus = STATUS.CONNECTED;
      this.emit('change', {
        status: this.currentStatus,
        message: this.message,
      });
    };

    this.websocketClient.onmessage = (result) => {
      if (JSON.stringify(this.message) === result.data) {
        return;
      }

      this.message = JSON.parse(result.data);
      this.emit('change', {
        status: this.currentStatus,
        message: this.message,
      });
    };

    this.websocketClient.onclose = (event) => {
      this.currentStatus = STATUS.DISCONNECT;
      this.emit('change', {
        status: this.currentStatus,
        message: this.message,
      });
      setTimeout(() => {
        this.connect();
      }, this.retryConnectTime);
    };

    this.currentStatus = STATUS.CONNECTING;
    this.emit('change', {
      status: this.currentStatus,
      message: this.message,
    });
  }

  send(message) {
    if (message === undefined) {
      return;
    }

    if (this.websocketClient === undefined) {
      return;
    }

    if (this.currentStatus !== STATUS.CONNECTED) {
      return;
    }

    try {
      this.websocketClient.send(message);
    } catch (e) {
      // sending failed
    }
  }
}
