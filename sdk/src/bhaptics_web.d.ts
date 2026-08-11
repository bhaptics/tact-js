/* tslint:disable */
/* eslint-disable */
/**
* @returns {Promise<boolean>}
*/
export function is_bhaptics_player_running(): Promise<boolean>;
/**
* @param {string} key
* @param {number} intensity
* @param {number} duration_ratio
* @param {number} angle_x
* @param {number} offset_y
* @param {number} device_index
* @returns {Promise<void>}
*/
export function play_without_result(key: string, intensity: number, duration_ratio: number, angle_x: number, offset_y: number, device_index: number): Promise<void>;
/**
* @param {string} key
* @param {number} intensity
* @param {number} duration_ratio
* @param {number} angle_x
* @param {number} offset_y
* @param {number} device_index
* @returns {Promise<number>}
*/
export function play_param(key: string, intensity: number, duration_ratio: number, angle_x: number, offset_y: number, device_index: number): Promise<number>;
/**
* @param {string} key
* @param {number} intensity
* @param {number} duration_ratio
* @param {number} angle_x
* @param {number} offset_y
* @param {number} interval
* @param {number} max_count
* @param {number} device_index
* @returns {Promise<number>}
*/
export function play_loop(key: string, intensity: number, duration_ratio: number, angle_x: number, offset_y: number, interval: number, max_count: number, device_index: number): Promise<number>;
/**
* @param {number} position
* @param {number} duration_millis
* @param {Int32Array} motor_values
* @param {number} device_index
* @returns {Promise<number>}
*/
export function play_dot(position: number, duration_millis: number, motor_values: Int32Array, device_index: number): Promise<number>;
/**
* @param {number} position
* @param {number} duration_millis
* @param {Float32Array} x
* @param {Float32Array} y
* @param {Int32Array} intensity
* @param {number} device_index
* @returns {Promise<number>}
*/
export function play_path(position: number, duration_millis: number, x: Float32Array, y: Float32Array, intensity: Int32Array, device_index: number): Promise<number>;
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
* @param {number} position
* @param {Int32Array} motors
* @param {Int32Array} playtimes
* @param {Int32Array} shapes
* @param {number} frequency
* @param {number} repeat_count
* @returns {Promise<number>}
*/
export function play_glove_dk3(position: number, motors: Int32Array, playtimes: Int32Array, shapes: Int32Array, frequency: number, repeat_count: number): Promise<number>;
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
* 반환값은 **첫 시도** 결과다(true = 즉시 연결/초기화 성공). connect 후에는 초기
* 연결 실패면 백그라운드 재시도 루프가, 연결됐다 끊기면 transport onclose →
* on_disconnect 가 자동 재연결을 처리하므로, 호출자는 이후 is_connected() 로 연결
* 여부를 확인하면 된다.
* @param {string} app_id
* @param {string} api_key
* @param {string} init_json_string
* @returns {Promise<boolean>}
*/
export function registry_and_initialize(app_id: string, api_key: string, init_json_string: string): Promise<boolean>;
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
* @param {number} device_index
* @returns {Promise<number>}
*/
export function play_event(event_name: string, device_index: number): Promise<number>;
/**
* @param {string} key
* @param {number} start_millis
* @param {number} intensity
* @param {number} duration_ratio
* @param {number} angle_x
* @param {number} offset_y
* @param {number} device_index
* @returns {Promise<number>}
*/
export function play_with_start_time(key: string, start_millis: number, intensity: number, duration_ratio: number, angle_x: number, offset_y: number, device_index: number): Promise<number>;
/**
* 반환값 시맨틱은 [`registry_and_initialize`] 와 동일하다(첫 시도 결과 + 초기 실패
* 재시도 + onclose 기반 드롭 후 재연결).
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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly close: () => number;
  readonly get_device_info_json: () => number;
  readonly get_event_time: (a: number, b: number) => number;
  readonly get_haptic_mappings_json: () => number;
  readonly is_bhaptics_device_connected: (a: number) => number;
  readonly is_bhaptics_player_installed: () => number;
  readonly is_bhaptics_player_running: () => number;
  readonly is_connected: () => number;
  readonly is_playing_event: () => number;
  readonly is_playing_event_by_event_id: (a: number, b: number) => number;
  readonly is_playing_event_by_request_id: (a: number) => number;
  readonly pause: (a: number, b: number) => number;
  readonly ping: (a: number, b: number) => number;
  readonly ping_all: () => number;
  readonly play_dot: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly play_event: (a: number, b: number, c: number) => number;
  readonly play_glove: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly play_glove_dk3: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly play_loop: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly play_param: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly play_path: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly play_with_start_time: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly play_without_result: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly registry_and_initialize: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly remote_registry_and_initialize: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly resume: (a: number, b: number) => number;
  readonly retry_initialize: (a: number, b: number, c: number, d: number) => number;
  readonly run_bhaptics_player: (a: number) => number;
  readonly set_device_vsm: (a: number, b: number, c: number) => number;
  readonly stop_all: () => number;
  readonly stop_by_event_name: (a: number, b: number) => number;
  readonly stop_by_request_id: (a: number) => number;
  readonly swap_position: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core_9b3796e30d99ddb7___ops__function__FnMut_______Output______as_wasm_bindgen_6a2d80d24f517486___closure__WasmClosure___describe__invoke___web_sys_cdcf5dcc636feea5___features__gen_CloseEvent__CloseEvent_____: (a: number, b: number, c: number) => void;
  readonly _dyn_core_9b3796e30d99ddb7___ops__function__FnMut_______Output______as_wasm_bindgen_6a2d80d24f517486___closure__WasmClosure___describe__invoke___wasm_bindgen_6a2d80d24f517486___JsValue_____: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen_6a2d80d24f517486___convert__closures__invoke2_mut___wasm_bindgen_6a2d80d24f517486___JsValue__wasm_bindgen_6a2d80d24f517486___JsValue_____: (a: number, b: number, c: number, d: number) => void;
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
