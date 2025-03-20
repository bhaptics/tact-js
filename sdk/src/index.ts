/**
 * bHaptics WebSDK
 * version: 0.0.1
 */

import init, {
  registry_and_initialize,
  remote_registry_and_initialize,
  play_dot,
  stop_all,
  play_with_start_time,
  get_device_info_json,
  pause,
  resume,
} from './bhaptics_web.js';
import utils from './internal/utils';

let defaultWorkspaceId: string | null = null;

type Option = {
  remote?: string;
};

const initBhaptics = async (workspaceid: string, key: string, option?: Option) => {
  await init();
  console.log('WebAssembly module loaded');

  if (option && option.remote) {
    const result = await remote_registry_and_initialize(option.remote, workspaceid, key, '');
    console.log('Result:', result);

    defaultWorkspaceId = workspaceid;
    return result;
  }

  const result = await registry_and_initialize(workspaceid, key, '');
  console.log('Result:', result);

  defaultWorkspaceId = workspaceid;
  return result;
};

type PlayParams = {
  eventKey: string;
  startTime?: number;
  intensity?: number;
  duration?: number;
  offsetX?: number;
  offsetY?: number;
};

const play = ({
  eventKey,
  startTime = 0,
  intensity = 1,
  duration = 1000,
  offsetX = 0,
  offsetY = 0,
}: PlayParams) => {
  play_with_start_time(eventKey, startTime, intensity, duration, offsetX, offsetY);
};

const stop = () => {
  stop_all();
};

const motorTest = async () => {
  console.log('motorTest');

  for (let index = 0; index < 40; index++) {
    const testMotor = Array.from({ length: 40 }, () => 0);
    testMotor[index] = 100;
    console.log('motor front test: ' + index + ', ' + JSON.stringify(testMotor));
    await play_dot(0, 1000, testMotor as unknown as Int32Array);
    await utils.sleep(1000);
  }
};

const getDeviceInfo = async () => {
  const devices = [];
  const result = await get_device_info_json();

  try {
    if (typeof result === 'string' && result.trim() !== '') {
      const devicesInfo = JSON.parse(result);

      if (Array.isArray(devicesInfo)) {
        for (const device of devicesInfo) {
          devices.push(device); //position, deviceName, address, connected, paired, battery, audioJackIn, vsm
        }
      }
      console.log('get_device_info_json devices: ' + devices[0].vsm);
    }
    return result;
  } catch (error) {
    console.error('error :', error);
  }
};

export default {
  initBhaptics,
  play,
  stop,
  pause,
  resume,
  motorTest,
  getDeviceInfo,
};
