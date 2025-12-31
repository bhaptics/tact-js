import HapticDriver, { PositionType } from 'tact-js';
import { useState } from 'react';
import { linearScale } from '../utils/Scale';
import { clamp } from '../utils/common';

type Point = {
  x: number;
  y: number;
  lifespan: number;
};

const MOTOR_POSITIONS = Array.from({ length: 32 }, (_, index) => {
  const isFront = index < 16;
  const localIndex = index % 16;
  const col = localIndex % 4;
  const row = Math.floor(localIndex / 4);

  const flippedCol = isFront ? col : 3 - col;

  const baseX = isFront ? 0 : 0.5;
  const x = baseX + (flippedCol / 4) * 0.5;
  const y = row / 3;

  return { x, y, index };
});

export default function NewPathModeSection() {
  const [points, setPoints] = useState<Point[]>([]);
  const [intensity, setIntensity] = useState<number>(100);
  const [duration, setDuration] = useState<number>(100);
  const [thickness, setThickness] = useState<number>(1);
  const [sharpness, setSharpness] = useState<number>(2);

  const activateDrawing = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setPoints([]);
  };

  const deactivateDrawing = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setTimeout(() => {
      setPoints([]);
    }, 1000);
  };

  const playPath = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;

    const x = linearScale(
      e.nativeEvent.offsetX,
      e.currentTarget.clientWidth,
      0
    );
    const y = linearScale(
      e.nativeEvent.offsetY,
      e.currentTarget.clientHeight,
      0
    );

    const clapmedX = clamp(x, 0, 1);
    const clampedY = clamp(y, 0, 1);

    const adjustedX =
      clapmedX - 0.087 < 0 ? clapmedX - 0.087 + 1 : clapmedX - 0.087;

    const distances = MOTOR_POSITIONS.map((motor) => {
      const directDx = motor.x - adjustedX;
      const wrapDx = directDx > 0 ? directDx - 1 : directDx + 1;

      const dx =
        (Math.abs(directDx) < Math.abs(wrapDx) ? directDx : wrapDx) * 2;
      const dy = motor.y - clampedY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return { ...motor, distance };
    });

    const closestMotors = distances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, Math.floor(1 + (thickness - 1) * 5));

    const motorValues = Array.from({ length: 32 }, () => 0);

    const sigma = 0.3 / sharpness;

    closestMotors.forEach((motor) => {
      const gaussianRatio = Math.exp(
        -(motor.distance * motor.distance) / (2 * sigma * sigma)
      );
      const adjustedIntensity = Math.round(intensity * gaussianRatio);
      motorValues[motor.index] = adjustedIntensity;
    });

    HapticDriver.playDot({
      position: PositionType.Vest,
      duration: duration,
      motorValues: motorValues,
    });
  };

  const draw = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;

    playPath(e);

    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().top;

    const clampedX = clamp(x, 0, e.currentTarget.clientWidth);
    const clampedY = clamp(y, 0, e.currentTarget.clientHeight);

    const newPath = [
      ...points.map((value) => ({ ...value, lifespan: value.lifespan - 5 })),
      { x: clampedX, y: clampedY, lifespan: 100 },
    ].filter((value) => value.lifespan > 0);

    setPoints(newPath);
  };

  return (
    <section
      className={`flex flex-col select-none items-start gap-2 transition-opacity`}
    >
      <h3 className="font-bold">New Path Mode Test</h3>
      <p>
        {`If you have a TactSuit connected, you can test the motors by dragging over the
        area below. The motors will vibrate according to the position of your mouse.`}
      </p>
      <div className="flex flex-col gap-10">
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
            max={200}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border border-neutral-200 p-2 rounded w-20"
          />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label htmlFor="thickness">Thickness (1~4)</label>
          <input
            type="range"
            min={1}
            max={4}
            step={0.5}
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
          />
          <span className="w-8 text-center">{thickness}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label htmlFor="sharpness">Sharpness (0.5~5)</label>
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.5}
            value={sharpness}
            onChange={(e) => setSharpness(Number(e.target.value))}
          />
          <span className="w-8 text-center">{sharpness}</span>
        </div>
      </div>

      <Header />
      <div className="relative w-full">
        <div
          className="flex w-full justify-center divide-x divide-gray-400"
          onPointerDown={activateDrawing}
          onPointerUp={deactivateDrawing}
          onPointerMove={draw}
        >
          <div className="flex-1 h-[416px] bg-gray-50 cursor-crosshair relative">
            <Indicator />
          </div>
          <div className="flex-1 h-[416px] bg-gray-50 cursor-crosshair relative">
            <Indicator />
          </div>
        </div>
        <Drawings points={points} />
      </div>
    </section>
  );
}

function Drawings({ points }: { points: Point[] }) {
  const createBezierPath = (points: Point[]) => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      d += ` Q ${current.x},${current.y} ${midX},${midY}`;
    }
    const last = points[points.length - 1];
    d += ` T ${last.x},${last.y}`;
    return d;
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <svg className=" w-full h-full">
        <path
          d={createBezierPath(points)}
          stroke="#155dfc"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col w-full pt-5 gap-5">
      <div className="flex flex-1 w-full justify-around ">
        <h4 className="text-gray-500 text-sm text-center">Front</h4>
        <h4 className="text-gray-500 text-sm text-center">Back</h4>
      </div>
      <div className="flex justify-between px-4">
        <p className="text-[11px] text-gray-400">L</p>
        <p className="text-[11px] text-gray-400">R</p>
        <p className="text-[11px] text-gray-400">L</p>
      </div>
    </div>
  );
}

function Indicator() {
  return (
    <>
      <div className="absolute h-full border-l border-dashed left-1/4 border-gray-300" />
      <div className="absolute h-full border-l border-dashed left-2/4 border-gray-300" />
      <div className="absolute h-full border-l border-dashed left-3/4 border-gray-300" />
      <div className="absolute w-full border-t border-dashed top-1/4 border-gray-300" />
      <div className="absolute w-full border-t border-dashed top-2/4 border-gray-300" />
      <div className="absolute w-full border-t border-dashed top-3/4 border-gray-300" />
    </>
  );
}
