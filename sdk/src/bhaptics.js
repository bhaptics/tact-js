/**
 * bHaptics WebSDK
 * version: 0.0.1
 */


import init, {
    registry_and_initialize, play_event, play_dot, stop_all,
    get_haptic_mappings, get_haptic_messages, get_haptic_mappings_json, get_device_info_json
} from '../../bhaptics_web.js';
import utils from "./internal/utils.js";
/**
 * private variables
 */

let registedEvent = {};
let defaultWorkspaceId = null;

/**
 * public functions
 */
const initBhaptics = async (workspaceid, key) => {
    await init();
    console.log("WebAssembly module loaded");
    
    const result = registry_and_initialize(workspaceid, key, "");
    console.log("Result:", result);

    defaultWorkspaceId = workspaceid;
};

const play = (eventKey, intensity = 1, workspaceId = null) => {
  console.log(
    `eventKey: ${eventKey}, intensity: ${intensity}, workspaceId: ${workspaceId}`,
  );

   play_event(eventKey);
};

const stop = (event) => {
    stop_all();
};

const motorTest = async() => {
    console.log("motorTest");

    for (let index = 0; index < 40; index++ ) {
        let testMotor = Array.from({ length: 40 }, () => 0);
        testMotor[index] = 100;
        console.log(
            "motor front test: " + index + ", " + JSON.stringify(testMotor),
        );
        await play_dot(0, 1000, testMotor);
        await utils.sleep(1000);
    }
};

const getHapticMappings = (workspaceid, key) => {
    const haptic = [];
    const jsonString = get_haptic_mappings(workspaceid, key, -1);

    defaultWorkspaceId = workspaceid;

    jsonString
        .then(result => {
            console.log("getHapticMappings result: " + result);
            if (typeof result === 'string' && result.trim() !== '') {
                const hapticMappings = JSON.parse(result);

                if (Array.isArray(hapticMappings.message)) {
                    for (const { key } of hapticMappings.message) {
                        haptic.push(key);
                    }
                    registedEvent[workspaceid] = haptic;
                }
            }
            return result;
        })
        .then(data => {
            //console.log("data: " + data);
        })
        .catch(error => {
            console.error("error :", error);
        });
};

const getHapticMessages = (workspaceid, key) => {
    const haptic = {};
    const jsonString = get_haptic_messages(workspaceid, key, -1);

    defaultWorkspaceId = workspaceid;

    jsonString
        .then(result => {
            if (typeof result === 'string' && result.trim() !== '') {
                const hapticMappings = JSON.parse(result);

                if (Array.isArray(hapticMappings)) {
                    for (const { key } of hapticMappings) {
                        haptic[key] = {};
                    }
                }
            }
            return result;
        })
        .then(data => {
            //console.log("data: " + data);
        })
        .catch(error => {
            console.error("error :", error);
        });
};
const getHapticMappingsJson = () => {
    const haptic = [];
    const jsonString = get_haptic_mappings_json();

    jsonString
        .then(result => {
            if (typeof result === 'string' && result.trim() !== '') {
                const hapticMappings = JSON.parse(result);
                
                if (Array.isArray(hapticMappings)) {
                    for (const { eventName, eventTime } of hapticMappings) {
                        haptic.push(eventName);
                    }
                    registedEvent[defaultWorkspaceId] = haptic;
                }
            }
            return result;
        })
        .then(data => {
            //console.log("data: " + data);
        })
        .catch(error => {
            console.error("error :", error);
        });
};


const getDeviceInfoJson = () => {
    const devices = [];
    const jsonString = get_device_info_json();

    jsonString
        .then(result => {
            if (typeof result === 'string' && result.trim() !== '') {
                const devicesInfo = JSON.parse(result);

                if (Array.isArray(devicesInfo)) {
                    for (const device of devicesInfo) {
                        devices.push(device); //position, deviceName, address, connected, paired, battery, audioJackIn, vsm
                    }
                    
                }
                console.log("get_device_info_json devices: " + devices[0].vsm);
            }
            return result;
        })
        .then(data => {
            //console.log("data: " + data);
        })
        .catch(error => {
            console.error("error :", error);
        });
};

// expose bhaptics sdk.
(function (global, factory) {
  // for CommonJS style
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    // for AMD style
    define(factory);
  } else {
    // for browser
    global.bhaptics = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  return {
    // initializers
      initBhaptics,
    // play, stop, close
    play,
    stop,
    motorTest,
    getHapticMappings,
    getHapticMappingsJson,
    getHapticMessages,
    getDeviceInfoJson,


    // etc
    printSdkInfo: () => {
      console.log(`bhaptics WebSDK: v0.0.1`);
      },
    getAllEventKeys: (includeText = null) => {
        return Object.values(registedEvent[defaultWorkspaceId])
        ;
      },
  };
});
