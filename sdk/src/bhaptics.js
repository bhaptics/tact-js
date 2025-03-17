/**
 * bHaptics WebSDK
 * version: 0.0.1
 */

import init, {
  registry_and_initialize,
  play_event,
  play_dot,
  stop_all,
  get_haptic_messages,
  get_device_info_json,
  is_connected,
  run_bhaptics_player,
} from './bhaptics_web.js';
import utils from './internal/utils.js';

/**
 * private variables
 */

let defaultWorkspaceId = null;

/**
 * public functions
 */
const initBhaptics = async (workspaceid, key) => {
  await init();
  console.log('WebAssembly module loaded');

  const result = await registry_and_initialize(workspaceid, key, '');
  console.log('Result:', result);

  defaultWorkspaceId = workspaceid;
  return result;
};

const runBhapticsPlayer = async () => {
  console.log('runBhapticsPlayer');
  run_bhaptics_player();
};

const isConnected = async () => {
  return is_connected();
};

const play = (eventKey, intensity = 1, workspaceId = null) => {
  console.log(`eventKey: ${eventKey}, intensity: ${intensity}, workspaceId: ${workspaceId}`);

  play_event(eventKey);
};

const stop = (event) => {
  stop_all();
};

const motorTest = async () => {
  console.log('motorTest');

  for (let index = 0; index < 40; index++) {
    let testMotor = Array.from({ length: 40 }, () => 0);
    testMotor[index] = 100;
    console.log('motor front test: ' + index + ', ' + JSON.stringify(testMotor));
    await play_dot(0, 1000, testMotor);
    await utils.sleep(1000);
  }
};

const getHapticMessages = async (workspaceid, key) => {
  const haptic = {};
  const result = await get_haptic_messages(workspaceid, key, -1);

  try {
    if (typeof result === 'string' && result.trim() !== '') {
      const hapticMappings = JSON.parse(result);

      if (Array.isArray(hapticMappings)) {
        for (const { key } of hapticMappings) {
          haptic[key] = {};
        }
      }
    }
    return result;
  } catch (error) {
    console.error('error :', error);
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

// expose bhaptics sdk.
export default {
  initBhaptics,
  isConnected,
  runBhapticsPlayer,
  play,
  stop,
  motorTest,
  getHapticMessages,
  getDeviceInfo,
};
