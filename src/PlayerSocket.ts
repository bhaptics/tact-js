import ErrorCode from "./models/ErrorCode";

const DEFAULT_URL= 'ws://127.0.0.1:15881/v2/feedbacks?' //app_id=com.bhaptics.designer2&app_name=bHaptics Designer';

export enum STATUS {
  CONNECTING = 'Connecting',
  CONNECTED ='Connected',
  DISCONNECT = 'Disconnected',
}

const DEFAULT_RETRY_CONNECT_TIME = 5000;

export interface Message {
  status: STATUS;
  message: any;
}

export default class PlayerSocket {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private handlers: Function[] = [];
  private websocketClient: any;
  private currentStatus: STATUS;
  private message: any;
  private isTriggered = false;
  private appId: string;
  private appName: string;

  retryConnectTime: number;

  constructor(appId = "yourAppId", appName = 'yourAppName', retryConnectTime = DEFAULT_RETRY_CONNECT_TIME) {
    this.appName = appName;
    this.appId = appId;
    this.message = {};
    this.retryConnectTime = retryConnectTime;
    this.currentStatus = STATUS.DISCONNECT;
  }

  public addListener = (func: (msg: Message) => void) => {
    this.handlers.push(func);
  };

  private emit = (msg: Message) => {
    this.handlers.forEach(func => {
      func(msg);
    })
  };

  connect = () => {
    try  {
      this.websocketClient = new WebSocket(`${DEFAULT_URL}app_id=${this.appId}&app_name=${this.appName}`);
    } catch (e) {
      // connection failed
      console.log('PlayerSocket', e);
      return;
    }

    this.websocketClient.onopen = () => {
      this.currentStatus = STATUS.CONNECTED;
      this.emit( {
        status: this.currentStatus,
        message: this.message,
      });
    };

    this.websocketClient.onmessage = (result: any) => {
      if (JSON.stringify(this.message) === result.data) {
        return;
      }

      this.message = JSON.parse(result.data);
      this.emit({
        status: this.currentStatus,
        message: this.message,
      });
    };

    this.websocketClient.onclose = (_: any) => {
      this.currentStatus = STATUS.DISCONNECT;
      this.emit( {
        status: this.currentStatus,
        message: this.message,
      });
      setTimeout(() => {
        this.connect();
      }, this.retryConnectTime);
    };

    this.websocketClient.onerror = (event: any) => {
      this.currentStatus = STATUS.DISCONNECT;
      this.emit({
        status: this.currentStatus,
        message: event.message,
      });
    }

    this.currentStatus = STATUS.CONNECTING;
    this.emit({
      status: this.currentStatus,
      message: this.message,
    });
  };

  send = (message: string): ErrorCode => {
    if (message === undefined) {
      return ErrorCode.CONNECTION_NOT_ESTABLISHED;
    }

    if (!this.isTriggered) {
      this.isTriggered = true;
      this.connect();
      return ErrorCode.CONNECTION_NOT_ESTABLISHED;
    }

    if (this.websocketClient === undefined) {
      return ErrorCode.CONNECTION_NOT_ESTABLISHED;
    }

    if (this.currentStatus !== STATUS.CONNECTED) {
      return ErrorCode.CONNECTION_NOT_ESTABLISHED;
    }

    try {
      this.websocketClient.send(message);
      return ErrorCode.SUCCESS;
    } catch (e) {
      // sending failed

      return ErrorCode.FAILED_TO_SEND_MESSAGE;
    }
  }
}
