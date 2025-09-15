import bhaptics_init, * as bhaptics from './bhaptics_web.js';
import { PositionType, PositionUtils } from './internal/position.js';
import utils from './internal/utils';

export type InitParams = {
  appId: string;
  apiKey: string;
};

export type PlayParams = {
  eventKey: string;
  startTime?: number;
  intensityRatio?: number;
  durationRatio?: number;
  offsetX?: number;
  offsetY?: number;
  deviceIndex?: number;
};

export type PlayLoopParams = {
  eventKey: string;
  intensityRatio?: number;
  durationRatio?: number;
  interval: number;
  max_count: number;
  offsetX: number;
  offsetY: number;
  deviceIndex?: number;
};

export type PlayDotParams = {
  position: PositionType;
  motorValues: number[];
  duration?: number;
  deviceIndex?: number;
};

export type PlayPathParams = {
  position: PositionType;
  x: number[];
  y: number[];
  intensity: number[];
  duration?: number;
  deviceIndex?: number;
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
   * ```typescript
   * await HapticDriver.init({
   *  appId: 'your-app-id',
   *  apiKey: 'your-api',
   * });
   * ```
   */
  async init({ appId, apiKey }: InitParams) {
    await bhaptics_init();
    return await bhaptics.registry_and_initialize(appId, apiKey, '');
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

      await bhaptics.play_dot(0, 1000, testMotor as unknown as Int32Array, -1);
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
    deviceIndex = -1,
  }: PlayParams) {
    await bhaptics.play_with_start_time(
      eventKey,
      startTime,
      intensityRatio,
      durationRatio,
      offsetX,
      offsetY,
      deviceIndex
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
    deviceIndex = -1,
  }: PlayLoopParams) {
    return await bhaptics.play_loop(
      eventKey,
      intensityRatio,
      durationRatio,
      offsetX,
      offsetY,
      interval,
      max_count,
      deviceIndex
    );
  },

  async playGlove({
    position,
    motors,
    playtimes,
    shapes,
    repeat_count,
  }: PlayGloveParams) {
    const enumPosition = PositionUtils.enumToPosition(position);
    return await bhaptics.play_glove(
      enumPosition,
      motors,
      playtimes,
      shapes,
      repeat_count
    );
  },

  async playDot({
    position,
    motorValues,
    duration = 500,
    deviceIndex = -1,
  }: PlayDotParams) {
    const enumPosition = PositionUtils.enumToPosition(position);
    const motors = new Int32Array(motorValues);
    return await bhaptics.play_dot(enumPosition, duration, motors, deviceIndex);
  },

  async playPath({
    position,
    x,
    y,
    intensity,
    duration = 40,
    deviceIndex = -1,
  }: PlayPathParams) {
    const enumPosition = PositionUtils.enumToPosition(position);
    const xValues = new Float32Array(x);
    const yValues = new Float32Array(y);
    const intensityValues = new Int32Array(intensity);
    return await bhaptics.play_path(
      enumPosition,
      duration,
      xValues,
      yValues,
      intensityValues,
      deviceIndex
    );
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
