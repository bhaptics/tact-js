/**
 * bHaptics WebSDK
 * version: 0.0.1
 */

import bhaptics_init, * as bhaptics from './bhaptics_web.js';
import utils from './internal/utils';

export type InitParams = {
  appId: string;
  apiKey: string;
  remote?: string;
};

export type PlayParams = {
  eventKey: string;
  startTime?: number;
  intensity?: number;
  duration?: number;
  offsetX?: number;
  offsetY?: number;
};

export default {
  async init({ appId, apiKey, remote }: InitParams) {
    await bhaptics_init();
    console.log('WebAssembly module loaded');

    const result = remote
      ? await bhaptics.remote_registry_and_initialize(remote, appId, apiKey, '')
      : await bhaptics.registry_and_initialize(appId, apiKey, '');

    console.log('Result: ', result);

    return result;
  },

  async play({
    eventKey,
    startTime = 0,
    intensity = 1,
    duration = 1,
    offsetX = 0,
    offsetY = 0,
  }: PlayParams) {
    await bhaptics.play_with_start_time(eventKey, startTime, intensity, duration, offsetX, offsetY);
  },

  async ping(address: string) {
    await bhaptics.ping(address);
  },

  async stop(eventKey: string) {
    await bhaptics.stop_by_event_name(eventKey);
  },

  async stopAll() {
    await bhaptics.stop_all();
  },

  async motorTest() {
    console.log('motorTest');

    for (let index = 0; index < 40; index++) {
      const testMotor = Array.from({ length: 40 }, () => 0);
      testMotor[index] = 100;
      console.log(`motor front test: ${index}, ${JSON.stringify(testMotor)}`);

      await bhaptics.play_dot(0, 1000, testMotor as unknown as Int32Array);
      await utils.sleep(1000);
    }
  },

  async getDeviceInfo() {
    try {
      const result = await bhaptics.get_device_info_json();

      if (typeof result === 'string' && result.trim()) {
        const devicesInfo = JSON.parse(result);

        if (Array.isArray(devicesInfo)) {
          console.log('Device info loaded:', devicesInfo);
          return devicesInfo;
        }
      }

      return [];
    } catch (error) {
      console.error('getDeviceInfo error:', error);
      return [];
    }
  },
};
