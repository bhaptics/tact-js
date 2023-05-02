import BhapticsPlayer  from '../index';

describe('hello test', () => {

  test('check add listener', () => {
    BhapticsPlayer.addListener((data) => {
      console.log(data);
    });
  });
});
