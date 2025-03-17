import HapticDriver from 'tact-js';
import { useEffect, useState } from 'react';
import { PlayIcon } from './PlayIcon';
import { StopIcon } from './StopIcon';

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

  const playEvent = (eventKey: string) => {
    /**
     * Plays the haptic event with the given event key.
     */
    HapticDriver.play(eventKey);
  };

  const stopEvent = () => {
    /**
     * Stops all haptic events.
     */
    HapticDriver.stop();
  };

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
      <h3>3. Play Events</h3>
      <p>These are the event keys you can use to play haptic feedback.</p>

      <div className="flex flex-col gap-2 w-full mt-2">
        <ul className="flex flex-col gap-2 bg-neutral-800 p-2 rounded-lg text-white">
          {!eventKeys && <li>Loading...</li>}

          {eventKeys?.map((eventKey) => (
            <li
              key={eventKey.key}
              className="rounded flex items-center pl-2 p-1 justify-between bg-neutral-600">
              <span>{eventKey.key}</span>
              <div className="flex">
                <button
                  onClick={() => playEvent(eventKey.key)}
                  className=" hover:bg-neutral-700 cursor-pointer  text-neutral-white size-9 items-center justify-center flex rounded-full">
                  <PlayIcon className="size-6" />
                </button>
                <button
                  onClick={stopEvent}
                  className=" hover:bg-neutral-700 cursor-pointer text-neutral-white size-9 items-center justify-center flex rounded-full">
                  <StopIcon className="size-6" />
                </button>
              </div>
            </li>
          ))}

          {eventKeys?.length === 0 && <li>No event keys found</li>}
        </ul>
      </div>
    </section>
  );
}
