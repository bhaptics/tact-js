import HapticDriver, { PositionType } from 'tact-js';
import { useRef, useState } from 'react';
import { linearScale } from '../utils/Scale';

export default function PathModeSection() {
  const [intensity, setIntensity] = useState<number>(100);
  const [duration, setDuration] = useState<number>(100);
  const on = useRef(false);

  const handlePointerDown = () => {
    on.current = true;
  };

  const handlePointerUp = () => {
    on.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => (front: boolean) => {
    if (!on.current) return;

    const offset = front ? 0 : 0.5;
    const x = linearScale(e.nativeEvent.offsetX, e.currentTarget.clientWidth, 0) / 2 + offset;
    const y = linearScale(e.nativeEvent.offsetY, e.currentTarget.clientHeight, 0);

    console.log(x, y);

    HapticDriver.playPath({
      position: PositionType.Vest,
      duration: duration,
      x: [x],
      y: [y],
      intensity: [intensity],
    });
  };

  return (
    <section className={`flex flex-col select-none items-start gap-2 transition-opacity`}>
      <h3>4. Path Mode Test</h3>
      <p>
        {`If you have a TactSuit connected, you can test the motors by moving your mouse over the
        area below. The motors will vibrate according to the position of your mouse.`}
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
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={(e) => {
            handlePointerMove(e)(true);
          }}
          className="w-[184px] h-[216px] rounded bg-gray-100 cursor-crosshair"></div>
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={(e) => {
            handlePointerMove(e)(false);
          }}
          className="w-[184px] h-[216px] rounded bg-gray-100 cursor-crosshair"></div>
      </div>
    </section>
  );
}
