import { useEffect } from 'react';
import HapticsDriver from 'tact-js';

function App() {
  useEffect(() => {
    HapticsDriver.initBhaptics('', '');
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">tact-js</h1>

      <div className="mt-8 flex items-center gap-2">
        <button
          className="bg-gray-100 p-2 px-4 rounded hover:bg-gray-200"
          onClick={() => HapticsDriver.motorTest()}>
          Motor Test
        </button>
      </div>
    </main>
  );
}

export default App;

{
  /* <button id="getEvent">Get Event</button>
	<button onclick="bhaptics.motorTest()">Motor Test</button>
	<button onclick="bhaptics.getHapticMappings('','')">getHapticMappings</button>
	<button onclick="bhaptics.getHapticMappingsJson()">getHapticMappingsJson</button>
	<button onclick="bhaptics.getHapticMessages('','')">getHapticMessages</button>
	<button onclick="bhaptics.getDeviceInfoJson()">getDeviceInfoJson</button> */
}
