import HapticDriver from 'tact-js';

export default function OpenPlayerSection() {
  return (
    <section className="flex flex-col items-start gap-2">
      <h3>1. Open bHaptics Player</h3>
      <p>
        Open the bHaptics Player app. If you don't have it installed, you can download it from{' '}
        <a
          href="https://www.bhaptics.com/software/player/?type=pcplayer"
          target="_blank"
          className="text-blue-600 underline">
          here
        </a>
        .
      </p>
      <button
        className="bg-gray-100 cursor-pointer p-2 px-4 rounded hover:bg-gray-200 mt-2"
        onClick={() => {
          HapticDriver.runBhapticsPlayer();
        }}>
        Open
      </button>
    </section>
  );
}
