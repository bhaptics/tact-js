import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import HapticDriver from 'tact-js';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { secondsToMMSS } from '../utils/Time';

export default function VideoSection() {
  const ref = useRef<ReactPlayer>(null);

  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [player, setPlayer] = useState<ReactPlayer>();

  const EVENT_KEY = 'ces_video';

  return (
    <section className={`flex flex-col items-start gap-2 transition-opacity`}>
      <h3>3. Video with Haptic</h3>
      <p>Watch this video with haptic feedback.</p>
      <div className="rounded-lg overflow-hidden border border-neutral-200">
        <div className="pointer-events-">
          <ReactPlayer
            ref={ref}
            url="https://www.youtube.com/watch?v=cXEhYjivY3o&ab_channel=MikeKim"
            playing={playing}
            onReady={(player) => setPlayer(player)}
            onPlay={async () => {
              setPlaying(true);
              HapticDriver.play({ eventKey: EVENT_KEY, startTime: currentTime * 1000 });
            }}
            onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
            onPause={async () => {
              setPlaying(false);
              await HapticDriver.stop(EVENT_KEY);
            }}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  disablekb: 1,
                  modestbranding: 1,
                  iv_load_policy: 3,
                  playsinline: 1,
                },
              },
            }}
          />
        </div>
        <div className="flex bg-neutral-100 p-3 gap-1">
          <button className="p-3 hover:bg-neutral-200 rounded" onClick={() => setPlaying(!playing)}>
            {playing ? <FaPause className="size-4" /> : <FaPlay className="size-4" />}
          </button>
          <button
            className="p-3 hover:bg-neutral-200 rounded"
            onClick={async () => {
              setPlaying(false);
              setCurrentTime(0);
              player?.seekTo(0);
              await HapticDriver.stop(EVENT_KEY);
            }}>
            <FaStop className="size-4" />
          </button>

          <div className="w-full flex flex-col justify-between ml-2 py-1">
            <div className="bg-neutral-200 h-1.5 w-full rounded-full">
              <div
                style={{
                  width: `${(currentTime / (player?.getDuration() ?? 1)) * 100}%`,
                }}
                className="bg-neutral-700 h-1.5 rounded-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 px-1">
              <span>{secondsToMMSS(currentTime)}</span>
              <span>{secondsToMMSS(player?.getDuration() ?? 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
