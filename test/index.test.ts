import BhapticsPlayer  from '../src';

describe('hello test', () => {

  test('check add listener', () => {
    BhapticsPlayer.initialize("test-app", 'test-app')
    BhapticsPlayer.addListener((data) => {
      console.log(data);
    });
  });
});
