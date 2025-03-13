declare module 'tact-js' {
  /**
   * Initializes the bHaptics WebSDK with the given workspace ID and key.
   */
  export function initBhaptics(workspaceid: string, key: string): Promise<void>;

  /**
   * Plays a haptic event with the given intensity.
   */
  export function play(eventKey: string, intensity?: number, workspaceId?: string | null): void;

  /**
   * Stops all haptic events.
   */
  export function stop(): void;

  /**
   * Runs a motor test sequence.
   */
  export function motorTest(): Promise<void>;

  /**
   * Retrieves haptic mappings for the given workspace ID and key.
   */
  export function getHapticMappings(workspaceid: string, key: string): void;

  /**
   * Retrieves haptic messages for the given workspace ID and key.
   */
  export function getHapticMessages(workspaceid: string, key: string): void;

  /**
   * Retrieves all haptic mappings in JSON format.
   */
  export function getHapticMappingsJson(): void;

  /**
   * Retrieves device information in JSON format.
   */
  export function getDeviceInfoJson(): void;

  /**
   * Prints SDK version information.
   */
  export function printSdkInfo(): void;

  /**
   * Retrieves all registered event keys.
   */
  export function getAllEventKeys(includeText?: string | null): string[];
}
