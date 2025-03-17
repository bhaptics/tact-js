/* tslint:disable */
/* eslint-disable */
/**
* @returns {Promise<boolean>}
*/
export function is_bhaptics_player_running(): Promise<boolean>;
/**
* @returns {Promise<boolean>}
*/
export function is_bhaptics_player_installed(): Promise<boolean>;
/**
* @param {boolean} try_launch
* @returns {Promise<boolean>}
*/
export function run_bhaptics_player(try_launch: boolean): Promise<boolean>;
/**
* @param {string} app_id
* @param {string} api_key
* @param {string} init_json_string
* @returns {Promise<boolean>}
*/
export function registry_and_initialize(app_id: string, api_key: string, init_json_string: string): Promise<boolean>;
/**
* @param {string} host
* @param {string} app_id
* @param {string} api_key
* @param {string} init_json_string
* @returns {Promise<boolean>}
*/
export function remote_registry_and_initialize(host: string, app_id: string, api_key: string, init_json_string: string): Promise<boolean>;
/**
* @param {string} app_id
* @param {string} api_key
* @returns {Promise<void>}
*/
export function retry_initialize(app_id: string, api_key: string): Promise<void>;
/**
* @returns {Promise<boolean>}
*/
export function is_connected(): Promise<boolean>;
/**
* @returns {Promise<void>}
*/
export function close(): Promise<void>;
/**
* @param {string} address
* @param {number} vsm
* @returns {Promise<void>}
*/
export function set_device_vsm(address: string, vsm: number): Promise<void>;
/**
* @param {string} address
* @returns {Promise<void>}
*/
export function swap_position(address: string): Promise<void>;
/**
* @param {number} position
* @returns {Promise<boolean>}
*/
export function is_bhaptics_device_connected(position: number): Promise<boolean>;
/**
* @param {string} address
* @returns {Promise<void>}
*/
export function ping(address: string): Promise<void>;
/**
* @returns {Promise<void>}
*/
export function ping_all(): Promise<void>;
/**
* @param {string} event_name
* @returns {Promise<number>}
*/
export function get_event_time(event_name: string): Promise<number>;
/**
* @returns {Promise<string>}
*/
export function get_device_info_json(): Promise<string>;
/**
* @returns {Promise<string>}
*/
export function get_haptic_mappings_json(): Promise<string>;
/**
* @returns {Promise<boolean>}
*/
export function is_playing_event(): Promise<boolean>;
/**
* @param {number} request_id
* @returns {Promise<boolean>}
*/
export function is_playing_event_by_request_id(request_id: number): Promise<boolean>;
/**
* @param {string} event_id
* @returns {Promise<boolean>}
*/
export function is_playing_event_by_event_id(event_id: string): Promise<boolean>;
/**
* @param {string} event_name
* @returns {Promise<number>}
*/
export function play_event(event_name: string): Promise<number>;
/**
* @param {string} key
* @param {number} position
* @param {number} intensity
* @param {number} durationMillis
* @param {number} angleX
* @param {number} offsetY
* @returns {Promise<void>}
*/
export function play_without_result(key: string, position: number, intensity: number, durationMillis: number, angleX: number, offsetY: number): Promise<void>;
/**
* @param {string} key
* @param {number} position
* @returns {Promise<number>}
*/
export function play_position(key: string, position: number): Promise<number>;
/**
* @param {string} key
* @param {number} position
* @param {number} intensity
* @param {number} durationMillis
* @param {number} angleX
* @param {number} offsetY
* @returns {Promise<number>}
*/
export function play_position_with_parameter(key: string, position: number, intensity: number, durationMillis: number, angleX: number, offsetY: number): Promise<number>;
/**
* @param {string} key
* @param {number} intensity
* @param {number} durationMillis
* @param {number} angleX
* @param {number} offsetY
* @param {number} interval
* @param {number} max_count
* @returns {Promise<number>}
*/
export function play_loop(key: string, intensity: number, durationMillis: number, angleX: number, offsetY: number, interval: number, max_count: number): Promise<number>;
/**
* @param {number} position
* @param {number} durationMillis
* @param {Int32Array} motorValues
* @returns {Promise<number>}
*/
export function play_dot(position: number, durationMillis: number, motorValues: Int32Array): Promise<number>;
/**
* @param {number} position
* @param {number} durationMillis
* @param {Float32Array} x
* @param {Float32Array} y
* @param {Int32Array} intensity
* @returns {Promise<number>}
*/
export function play_path(position: number, durationMillis: number, x: Float32Array, y: Float32Array, intensity: Int32Array): Promise<number>;
/**
* @param {number} position
* @param {Int32Array} motors
* @param {Int32Array} playtimes
* @param {Int32Array} shapes
* @param {number} repeat_count
* @returns {Promise<number>}
*/
export function play_glove(position: number, motors: Int32Array, playtimes: Int32Array, shapes: Int32Array, repeat_count: number): Promise<number>;
/**
* @param {string} event
* @returns {Promise<void>}
*/
export function pause(event: string): Promise<void>;
/**
* @param {string} event
* @returns {Promise<void>}
*/
export function resume(event: string): Promise<void>;
/**
* @param {number} request_id
* @returns {Promise<void>}
*/
export function stop_by_request_id(request_id: number): Promise<void>;
/**
* @param {string} event_name
* @returns {Promise<void>}
*/
export function stop_by_event_name(event_name: string): Promise<void>;
/**
* @returns {Promise<void>}
*/
export function stop_all(): Promise<void>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly is_bhaptics_player_running: () => number;
  readonly is_bhaptics_player_installed: () => number;
  readonly run_bhaptics_player: (a: number) => number;
  readonly registry_and_initialize: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly remote_registry_and_initialize: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly retry_initialize: (a: number, b: number, c: number, d: number) => number;
  readonly is_connected: () => number;
  readonly close: () => number;
  readonly set_device_vsm: (a: number, b: number, c: number) => number;
  readonly swap_position: (a: number, b: number) => number;
  readonly is_bhaptics_device_connected: (a: number) => number;
  readonly ping: (a: number, b: number) => number;
  readonly ping_all: () => number;
  readonly get_event_time: (a: number, b: number) => number;
  readonly get_device_info_json: () => number;
  readonly get_haptic_mappings_json: () => number;
  readonly is_playing_event: () => number;
  readonly is_playing_event_by_request_id: (a: number) => number;
  readonly is_playing_event_by_event_id: (a: number, b: number) => number;
  readonly play_event: (a: number, b: number) => number;
  readonly play_without_result: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly play_position: (a: number, b: number, c: number) => number;
  readonly play_position_with_parameter: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly play_loop: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly play_dot: (a: number, b: number, c: number, d: number) => number;
  readonly play_path: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly play_glove: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly pause: (a: number, b: number) => number;
  readonly resume: (a: number, b: number) => number;
  readonly stop_by_request_id: (a: number) => number;
  readonly stop_by_event_name: (a: number, b: number) => number;
  readonly stop_all: () => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h205994645c899932: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h56c240c94952370d: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__hdb5c37827ce37372: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
