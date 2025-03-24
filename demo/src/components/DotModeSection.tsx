import { useState } from 'react';
import HapticDriver, { PositionType } from 'tact-js';

const motors = Array.from({ length: 40 }).map(() => 0);

export default function DotModeSection() {
  const [intensity, setIntensity] = useState<number>(100);
  const [duration, setDuration] = useState<number>(1000);

  const handleClick = (index: number) => (front: boolean) => {
    const offset = front ? 0 : 20;
    const newMotors = [...motors];
    newMotors[index + offset] = intensity;

    HapticDriver.playDot({
      position: PositionType.Vest,
      duration: duration,
      motorValues: newMotors,
    });
  };

  return (
    <section className={`flex flex-col items-start gap-2 transition-opacity select-none`}>
      <h3>3. Dot Mode Test</h3>
      <p className="">
        {`If you have a TactSuit connected, you can test the motors by clicking the buttons below.
        Each button will trigger a single motor for 1 second.`}
      </p>
      <div className="flex gap-10">
        <div className="flex items-center gap-3 text-sm">
          <label htmlFor="intensity">Intensity (0~100)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label htmlFor="intensity">Duration (ms)</label>
          <input
            type="number"
            min={0}
            max={200}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border border-neutral-200 p-2 rounded w-20"
          />
        </div>
      </div>
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
