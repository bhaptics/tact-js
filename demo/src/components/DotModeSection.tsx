import HapticDriver, { PositionType } from 'tact-js';

const motors = Array.from({ length: 40 }).map(() => 0);

export default function DotModeSection() {
  const handleClick = (index: number) => (front: boolean) => {
    const offset = front ? 0 : 20;
    const newMotors = [...motors];
    newMotors[index + offset] = 100;
    HapticDriver.playDot({
      position: PositionType.Vest,
      duration: 1000,
      motorValues: newMotors,
    });
  };

  return (
    <section className={`flex flex-col items-start gap-2 transition-opacity`}>
      <h3>3. Dot Mode Test</h3>
      <p className="">
        {`If you have a TactSuit connected, you can test the motors by clicking the buttons below.
        Each button will trigger a single motor for 1 second.`}
      </p>
      <div className="flex gap-10 w-full justify-center py-5">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, index) => (
            <button
              className="cursor-pointer bg-gray-100 p-5 rounded hover:bg-gray-200 mt-2"
              onClick={() => handleClick(index)(true)}></button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {motors.slice(16, 32).map((_, index) => (
            <button
              className="cursor-pointer bg-gray-100 p-5 rounded hover:bg-gray-200 mt-2"
              onClick={() => handleClick(index)(false)}></button>
          ))}
        </div>
      </div>
    </section>
  );
}
