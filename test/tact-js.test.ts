import HapticPlayer from '../src/tact-js'
import { PositionType } from '../src/Interfaces'

/**
 * Dummy test
 */
describe("Simple test", () => {
  it("test if working", () => {

    setTimeout(() => {
      console.log('test');
      // HapticPlayer.submitPath('test2', PositionType.VestFront, [{intensity: 100, x: 0.5, y: 0.5}], 1000);
      // HapticPlayer.submitDot('test', PositionType.VestBack, [{index: 0, intensity: 100}], 1000);
    }, 1000)
  });
});
