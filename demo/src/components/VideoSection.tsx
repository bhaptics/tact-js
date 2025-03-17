import { useState } from 'react';
import ReactPlayer from 'react-player';
import HapticDriver from 'tact-js';

export default function VideoSection() {
  const [paused, setPaused] = useState<boolean>(false);
  return (
    <section className={`flex flex-col items-start gap-2 transition-opacity`}>
      <h3>4. Video with Haptic</h3>
      <p>Watch this video with haptic feedback.</p>
      <div className="rounded-lg overflow-hidden">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=cXEhYjivY3o&ab_channel=MikeKim"
          onPlay={async () => {
            if (paused) {
              console.log('resume');
              await HapticDriver.resume('ces_video');
              setPaused(false);
            } else {
              console.log('play');
              HapticDriver.play('ces_video');
            }
          }}
          onPause={async () => {
            console.log('pause');
            await HapticDriver.pause('ces_video');
            setPaused(true);
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
    </section>
  );
}
