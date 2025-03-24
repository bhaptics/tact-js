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
          <label htmlFor="duration">Duration (ms)</label>
          <input
            type="number"
            min={0}
            max={1000}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border border-neutral-200 p-2 rounded w-20"
          />
        </div>
      </div>
      <Header />
      <div className="flex gap-5 w-full justify-center">
        <div className="flex-1 grid grid-cols-4 gap-px bg-gray-200">
          {Array.from({ length: 16 }).map((_, index) => (
            <button
              className="cursor-pointer bg-gray-50 py-10  hover:bg-gray-100  text-gray-400 text-sm"
              onClick={() => handleClick(index)(true)}>
              {index}
            </button>
          ))}
        </div>
        <div className="flex-1  grid grid-cols-4 gap-px bg-gray-200">
          {motors.slice(16, 32).map((_, index) => (
            <button
              className="cursor-pointer bg-gray-50 py-10  hover:bg-gray-100  text-gray-400 text-sm"
              onClick={() => handleClick(index)(false)}>
              {index + 20}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex w-full pt-5 gap-5">
      <div className="flex flex-col flex-1 w-full justify-around ">
        <h4 className="text-gray-500 text-sm text-center">Front</h4>
        <div className="flex justify-between px-4">
          <p className="text-[11px] text-gray-400">L</p>
          <p className="text-[11px] text-gray-400">R</p>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full justify-around ">
        <h4 className="text-gray-500 text-sm text-center">Back</h4>
        <div className="flex justify-between px-4">
          <p className="text-[11px] text-gray-400">L</p>
          <p className="text-[11px] text-gray-400">R</p>
        </div>
      </div>
    </div>
  );
}
