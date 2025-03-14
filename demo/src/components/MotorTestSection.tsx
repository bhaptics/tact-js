import HapticDriver from 'tact-js';

export default function MotorTestSection() {
  const testMotors = async () => {
    await HapticDriver.motorTest();
  };

  return (
    <section className={`flex flex-col items-start gap-2 transition-opacity`}>
      <h3>2. Motor Test</h3>
      <p>If you have a TactSuit connected, you can test the motors by clicking the button below.</p>
      <button
        className="cursor-pointer bg-gray-100 p-2 px-4 rounded hover:bg-gray-200 mt-2"
        onClick={testMotors}>
        Test
      </button>
    </section>
  );
}
