import HapticDriver from 'tact-js';
import { useEffect, useState } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { Timer } from '../utils/Timer';

type EventKey = {
  key: string;
  description: string;
  durationMillis: number;
  isAudio: boolean;
  updateTime: string;
  positions: string[];
};

async function fetchEventKeys({ appId, apiKey }: { appId: string; apiKey: string }) {
  const res = await fetch(
    `api/v1/haptic-definitions/workspace/latest-mapping-meta?workspace-id=${appId}&api-key=${apiKey}`
  );
  const result = await res.json();
  const data = (await result.message) as EventKey[];

  return data;
}

interface EventKeySectionProps {
  appId: string;
  apiKey: string;
}

export function EventKeySection({ appId, apiKey }: EventKeySectionProps) {
  const [eventKeys, setEventKeys] = useState<EventKey[]>();

  useEffect(() => {
    fetchEventKeys({
      appId,
      apiKey,
    }).then((data) => {
      setEventKeys(data);
    });
  }, [apiKey, appId]);

  return (
    <section className={`flex flex-col items-start gap-2 transition-opacity`}>
      <h3>2. Play Events</h3>
      <p>These are the event keys you can use to play haptic feedback.</p>

      <div className="flex flex-col gap-2 w-full mt-2">
        <ul className="flex flex-col gap-2 bg-neutral-600 p-2 rounded-lg text-white">
          {!eventKeys && <li>Loading...</li>}

          {eventKeys?.map((eventKey) => (
            <Event key={eventKey.key} eventKey={eventKey} />
          ))}

          {eventKeys?.length === 0 && <li>No event keys found</li>}
        </ul>
      </div>
    </section>
  );
}

function Event({ eventKey }: { eventKey: EventKey }) {
  const [currentTime, setCurrentTime] = useState(0);

  const playEvent = (key: string) => {
    /**
     * Plays the haptic event with the given event key.
     */

    HapticDriver.play({ eventKey: key });

    Timer.start((res: { interval: number; elapsed: number }) => {
      setCurrentTime(res.elapsed);
      if (res.elapsed >= eventKey.durationMillis) {
        stopTimer();
      }
    });
  };

  const stopTimer = () => {
    Timer.stop();
    setCurrentTime(0);
  };

  const stopEvent = (eventKey: string) => {
    /**
     * Stops all haptic events.
     */
    stopTimer();
    HapticDriver.stop(eventKey);
  };

  return (
    <li className="relative rounded flex items-center pl-2 p-1 justify-between bg-black">
      <span>{eventKey.key}</span>
      <div className="flex">
        <button
          onClick={() => playEvent(eventKey.key)}
          className=" hover:bg-neutral-700 cursor-pointer  text-neutral-white size-8 items-center justify-center flex rounded">
          {currentTime !== 0 ? <FaPause className="size-3" /> : <FaPlay className="size-3" />}
        </button>
        <button
          onClick={() => stopEvent(eventKey.key)}
          className=" hover:bg-neutral-700 cursor-pointer text-neutral-white size-8 items-center justify-center flex rounded">
          <FaStop className="size-3" />
        </button>
      </div>
      <div
        className="absolute pointer-events-none inset-0 w-full mix-blend-difference bg-white"
        style={{
          width: currentTime !== 0 ? `${(currentTime / eventKey.durationMillis) * 100}%` : '0%',
          borderRadius: '0.25rem',
        }}
      />
    </li>
  );
}
