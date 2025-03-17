import { useEffect, useState } from 'react';
import HapticDriver from 'tact-js';
import Connection from './components/Connnection';
import OpenPlayerSection from './components/OpenPlayerSection';
import MotorTestSection from './components/MotorTestSection';
import { EventKeySection } from './components/EventKeySection';
import VideoSection from './components/VideoSection';

const APP_ID = '67d0055d69fb8c79a66b1cb6';
const API_KEY = 'Sv3sOVOSeLFl8t8QTKpK';

export default function App() {
  const [connected, setConnected] = useState<boolean>(false);

  const init = async () => {
    /**
     * initBhaptics(workspaceid: string, key: string): Promise<boolean>
     * You can get the App ID and API key from the bhaptics Developer page.
     * https://developer.bhaptics.com/applications
     */
    const status = await HapticDriver.initBhaptics(APP_ID, API_KEY, {
      // remote: '192.168.100.22:15881',
    });
    setConnected(status);
  };

  useEffect(() => {
    if (!connected) {
      init();
    }
  }, [connected]);

  return (
    <main className="flex flex-col items-center min-h-screen p-32">
      <div className="flex items-center flex-col gap-5 mb-10">
        <h1 className="text-4xl font-bold">tact-js</h1>
        <Connection connected={connected} />
      </div>

      <div className="grid grid-cols-1 gap-10 items-start ">
        <OpenPlayerSection />
        <MotorTestSection />
        <EventKeySection appId={APP_ID} apiKey={API_KEY} />
        <VideoSection />
      </div>
    </main>
  );
}
