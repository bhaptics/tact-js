import HapticDriver, { PositionType } from 'tact-js';
import { useRef, useState } from 'react';
import { linearScale } from '../utils/Scale';

type Point = {
  x: number;
  y: number;
  lifespan: number;
};

export default function PathModeSection() {
  const [points, setPoints] = useState<Point[]>([]);
  const [intensity, setIntensity] = useState<number>(100);
  const [duration, setDuration] = useState<number>(100);
  const on = useRef(false);

  const activateDrawing = () => {
    setPoints([]);
    on.current = true;
  };

  const deactivateDrawing = () => {
    on.current = false;

    setTimeout(() => {
      setPoints([]);
    }, 1000);
  };

  const updatePoints = (x: number, y: number) => {
    const newPath = [
      ...points.map((value) => ({ ...value, lifespan: value.lifespan - 5 })),
      { x, y, lifespan: 100 },
    ].filter((value) => value.lifespan > 0);
    setPoints(newPath);
  };

  const updateDrawing = (e: React.PointerEvent<HTMLDivElement>) => {
    if (on.current) {
      updatePoints(
        e.clientX - e.currentTarget.getBoundingClientRect().left,
        e.clientY - e.currentTarget.getBoundingClientRect().top
      );
    }
  };

  const playPath = (e: React.PointerEvent<HTMLDivElement>) => (front: boolean) => {
    if (!on.current) return;

    const offset = front ? 0 : 0.5;
    const x = linearScale(e.nativeEvent.offsetX, e.currentTarget.clientWidth, 0) / 2 + offset;
    const y = linearScale(e.nativeEvent.offsetY, e.currentTarget.clientHeight, 0);

    if (x < 0 || x > 1 || y < 0 || y > 1) return;

    /**
     * Play the path with the given position, duration, x, y, and intensity.
     */
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
        {`If you have a TactSuit connected, you can test the motors by dragging over the
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

      <Header />
      <div className="relative w-full">
        <div
          className="flex w-full justify-center divide-x divide-gray-400"
          onPointerDown={activateDrawing}
          onPointerUp={deactivateDrawing}
          onPointerMove={updateDrawing}
          onPointerLeave={deactivateDrawing}>
          <div
            onPointerMove={(e) => {
              playPath(e)(true);
            }}
            className="flex-1 h-[416px] bg-gray-50 cursor-crosshair relative">
            <Indicator />
          </div>
          <div
            onPointerMove={(e) => {
              playPath(e)(false);
            }}
            className="flex-1 h-[416px] bg-gray-50 cursor-crosshair relative">
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
