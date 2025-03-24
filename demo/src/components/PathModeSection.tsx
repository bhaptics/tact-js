import HapticDriver, { PositionType } from 'tact-js';
import { useRef } from 'react';
import { linearScale } from '../utils/Scale';

export default function PathModeSection() {
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
    const y = linearScale(e.nativeEvent.offsetY, e.currentTarget.clientHeight, 0) / 2 + offset;

    console.log(x, y);

    HapticDriver.playPath({
      position: PositionType.Vest,
      duration: 100,
      x: [x],
      y: [y],
      intensity: [100],
    });
  };

  return (
    <section className={`flex flex-col select-none items-start gap-2 transition-opacity`}>
      <h3>4. Path Mode Test</h3>
      <p>
        {`If you have a TactSuit connected, you can test the motors by moving your mouse over the
        area below. The motors will vibrate according to the position of your mouse.`}
      </p>
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
