/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class Timer {
  private static worker?: ServiceWorkerRegistration;
  private static working = false;
  private static cb: any;
  private static inited = false;

  static init = async () => {
    if (!Timer.inited) {
      Timer.inited = true;
      await Timer.unregister();
      await Timer.register();
      console.log('Timer inited');
    }
  };

  static start = (_cb: any) => {
    if (!Timer.working && !!Timer.worker) {
      // console.log("start");
      Timer.cb = _cb;
      Timer.working = true;
      Timer.worker.active?.postMessage('start', _cb);
    }
  };

  static stop = async () => {
    if (Timer.worker) {
      // console.log("stop");
      Timer.working = false;
      Timer.worker.active?.postMessage('stop');
    }
  };

  private static register = async () => {
    try {
      navigator.serviceWorker.register('/serviceworker.js').then((r) => {
        Timer.worker = r;
        Timer.working = false;
        navigator.serviceWorker.addEventListener('message', (e) => {
          Timer?.cb(e.data);
        });
      });
    } catch (e) {
      console.log('register failed');
    }
  };

  private static unregister = async () => {
    try {
      navigator.serviceWorker.getRegistration('./serviceworker.js').then((r) => {
        if (r) {
          r.active?.postMessage('stop');
          r.unregister();
          // console.log("unregistered");
        }
      });
    } catch (e) {
      console.log('unregister failed');
    }
  };
}
