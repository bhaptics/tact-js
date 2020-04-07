# tact-js
Library for bHaptics Haptic Devices

### Prerequisite
bHaptics Player has to be installed (window) and running.


### Examples
* https://elated-noyce-f0332a.netlify.com/

or 

* Open samples/simple/index.html directory in browser (Example code)


### How to setup

1. Install via npm
```
npm install tact-js
```

2. Import library
```javascript
import tactJs from 'tact-js'
```

3. Checking connection status between the bHaptics Player and your application  

* Connection Status: Connected | Disconnected | Connecting
```javascript
tactJs.addListener(function(msg) {
  if (msg.status === 'Connected') {
    console.log('connected');
  } else if (msg.status === 'Disconnected') {

  } else if (msg.status === 'Connecting') {
    // 
  }
});
```



### How to use
1. Dot Mode - submitDot()

* Parameters
  * key: string;
  * position: 'VestFront' | 'VestBack' | 'Head' | 'ForearmL' | 'ForearmR'
  * points: array of object with (index, intensity)
      * index: [0, 19]
      * intensity: [1, 100] 
  * durationMillis: [50, 10000]

* Return Type: ErrorCode

```javascript
var key = 'dot';
var position = 'VestFront'
var points = [{
    index : 10,
    intensity : 100
}];
var durationMillis = 1000; // 1000ms
var errorCode = tactJs.submitDot(key, position, points, durationMillis);
```

2. PathMode - submitPath()

* Parameters
  * key: string;
  * position: 'VestFront' | 'VestBack' | 'Head' | 'ForearmL' | 'ForearmR'
  * points: array of object with (x, y, intensity)
      * x: [0, 1]
      * y: [0, 1]
      * intensity: [1, 100] 
  * durationMillis: [50, 10000]
  
* Return Type: ErrorCode
  
* Example
```javascript
var key = 'dot';
var position = 'VestFront'
var points = [{
    x : 0.5,
    y : 0.5,
    intensity : 100
}];
var durationMillis = 1000; // 1000ms
var errorCode = tactJs.submitPath(key, position, points, durationMillis);
```


3.1. Tact File - registerFile()
* You need to registerFile, before calling submitRegistered(), submitRegisteredWithRotationOption() and submitRegisteredWithScaleOption()
* key: string;
* tactFile: provided *.tact file
 
```javascript
var key = 'key';
var tactFile = '{"project":{"createdAt":1583739337216,"description":"","layout":{"layouts":{"For...' // tact file string
var errorCode = tactJs.registerFile(key, tactFile);
```

3.2. Tact File - submitRegistered()

* Parameters
  * key: string;
  
* Return Type: ErrorCode

* Example
```javascript
var errorCode = tactJs.submitRegistered(key);
```

3.3. Tact File - submitRegisteredWithRotationOption()
* This function only works with Tactot(Vest) haptic pattern.
* Parameters
  * key: string;
  * object with (offsetAngleX, offsetY)
     * offsetAngleX: [0, 360]
     * offsetY: [-0.5, 0.5]
 
* Return Type: ErrorCode
 
* Example
```javascript
var key = 'key';
var rotationOption = {offsetAngleX: 180, offsetY: 0.2};
var errorCode = tactJs.submitRegisteredWithRotationOption(key, rotationOption);
```

3.4. Tact File - submitRegisteredWithScaleOption()
* Parameters
  * key: string;
  * object with (intensity, duration)
     * intensity: [0.2, 5]
     * duration: [0.2, 5]
 
* Return Type: ErrorCode
 
* Example
```javascript
var key = 'key';
var scaleOption = {intensity: 1, duration: 1};
var errorCode = tactJs.submitRegisteredWithScaleOption(key, scaleOption);
```

### Error Code
* 0: SUCCESS
* 2: CONNECTION_NOT_ESTABLISHED - Check if the bhaptics player is running or not
* 5: MESSAGE_INVALID_DURATION_MILLIS - durationMillis [20ms~100,000ms]
* 6: MESSAGE_INVALID_DOT_INDEX_HEAD - index should be [0, 5]
* 7: MESSAGE_INVALID_DOT_INDEX_ARM - index should be [0, 5]
* 8: MESSAGE_INVALID_DOT_INDEX_VEST - index should be [0, 19]
* 9: MESSAGE_INVALID_INTENSITY - intensity should be [0, 100]
* 10: MESSAGE_INVALID_X -  x should be [0, 1]
* 11: MESSAGE_INVALID_Y - y should be [0, 1]
* 12: MESSAGE_INVALID_ROTATION_X - rotationOffsetX should be [0, 360]
* 13: MESSAGE_INVALID_ROTATION_Y - offsetY should be [-0.5, 0.5]
* 14: MESSAGE_INVALID_SCALE_INTENSITY_RATIO - intensityRatio should be [0.2, 5]
* 15: MESSAGE_INVALID_SCALE_DURATION_RATIO - durationRatio should be [0.2, 5]
* 16: MESSAGE_NOT_REGISTERED_KEY - key not registered
