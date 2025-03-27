import bhaptics_init, * as bhaptics from './bhaptics_web.js';
import { PositionType, PositionUtils } from './internal/position.js';
import utils from './internal/utils';

export type InitParams = {
  appId: string;
  apiKey: string;
  remote?: string;
};

export type PlayParams = {
  eventKey: string;
  startTime?: number;
  intensityRatio?: number;
  durationRatio?: number;
  offsetX?: number;
  offsetY?: number;
};

export type PlayLoopParams = {
  eventKey: string;
  intensityRatio?: number;
  durationRatio?: number;
  interval: number;
  max_count: number;
  offsetX: number;
  offsetY: number;
};

export type PlayDotParams = {
  position: PositionType;
  motorValues: number[];
  duration?: number;
};

export type PlayPathParams = {
  position: PositionType;
  x: number[];
  y: number[];
  intensity: number[];
  duration?: number;
};

export type PlayGloveParams = {
  position: PositionType;
  motors: Int32Array;
  playtimes: Int32Array;
  shapes: Int32Array;
  repeat_count: number;
};

export { PositionType, PositionUtils };

const Tact = {
  /**
   * Initialize the bHaptics WebSDK
   * @example
   * ```typescript
   * await HapticDriver.init({
   *  appId: 'your-app-id',
   *  apiKey: 'your-api',
   * });
   * ```
   * @example
   * If you want to connect to a remote server
   * ```typescript
   * await HapticDriver.init({
   *  appId: 'your-app-id',
   *  apiKey: 'your-api',
   *  remote: 'ip-address:15881',
   * });
   * ```
   */
  async init({ appId, apiKey, remote }: InitParams) {
    await bhaptics_init();
    console.log('WebAssembly module loaded');

    return remote
      ? await bhaptics.remote_registry_and_initialize(remote, appId, apiKey, '')
      : await bhaptics.registry_and_initialize(appId, apiKey, '');
  },

  async ping(address: string) {
    await bhaptics.ping(address);
  },

  async pingAll() {
    await bhaptics.ping_all();
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

  /**
   * Play the event
   * @param {number} param.startTime - milliseconds
   */
  async play({
    eventKey,
    startTime = 0,
    intensityRatio = 1,
    durationRatio = 1,
    offsetX = 0,
    offsetY = 0,
  }: PlayParams) {
    await bhaptics.play_with_start_time(
      eventKey,
      startTime,
      intensityRatio,
      durationRatio,
      offsetX,
      offsetY
    );
  },

  async playLoop({
    eventKey,
    intensityRatio = 1,
    durationRatio = 1,
    interval = 1000,
    max_count = 1,
    offsetX = 0,
    offsetY = 0,
  }: PlayLoopParams) {
    return await bhaptics.play_loop(
      eventKey,
      intensityRatio,
      durationRatio,
      offsetX,
      offsetY,
      interval,
      max_count
    );
  },

  async playPosition(eventKey: string, position: PositionType) {
    const enumPosition = PositionUtils.enumToPosition(position);
    return await bhaptics.play_position(eventKey, enumPosition);
  },

  async playGlove({ position, motors, playtimes, shapes, repeat_count }: PlayGloveParams) {
    const enumPosition = PositionUtils.enumToPosition(position);
    return await bhaptics.play_glove(enumPosition, motors, playtimes, shapes, repeat_count);
  },

  async playDot({ position, motorValues, duration = 500 }: PlayDotParams) {
    const enumPosition = PositionUtils.enumToPosition(position);
    const motors = new Int32Array(motorValues);
    return await bhaptics.play_dot(enumPosition, duration, motors);
  },

  async playPath({ position, x, y, intensity, duration = 40 }: PlayPathParams) {
    const enumPosition = PositionUtils.enumToPosition(position);
    const xValues = new Float32Array(x);
    const yValues = new Float32Array(y);
    const intensityValues = new Int32Array(intensity);
    return await bhaptics.play_path(enumPosition, duration, xValues, yValues, intensityValues);
  },

  async pause(eventKey: string) {
    return await bhaptics.pause(eventKey);
  },

  async resume(eventKey: string) {
    return await bhaptics.resume(eventKey);
  },

  async stop(eventKey: string) {
    await bhaptics.stop_by_event_name(eventKey);
  },

  async stopAll() {
    await bhaptics.stop_all();
  },

  async getConnectedDevices() {
    try {
      const result = await bhaptics.get_device_info_json();
      const devicesInfo = JSON.parse(result);

      console.log('Device info loaded:', devicesInfo);

      if (Array.isArray(devicesInfo)) {
        return devicesInfo;
      }

      return [];
    } catch (error) {
      console.error('getDeviceInfo error:', error);
      return [];
    }
  },

  async getHapticMappings() {
    try {
      const result = await bhaptics.get_haptic_mappings_json();
      const hapticMappings = JSON.parse(result);

      if (Array.isArray(hapticMappings)) {
        console.log('Haptic mappings loaded:', hapticMappings);
        return hapticMappings;
      }

      return [];
    } catch (error) {
      console.error('getDeviceInfo error:', error);
      return [];
    }
  },

  async getEvent(eventKey: string) {
    return await bhaptics.get_event_time(eventKey);
  },

  async isDeviceConnected(position: PositionType) {
    const enumPosition = PositionUtils.enumToPosition(position);
    return await bhaptics.is_bhaptics_device_connected(enumPosition);
  },

  async isConnected() {
    return await bhaptics.is_connected();
  },

  async isPlaying() {
    return await bhaptics.is_playing_event();
  },

  async isPlayingByEventKey(eventKey: string) {
    return await bhaptics.is_playing_event_by_event_id(eventKey);
  },
};

export default Tact;
