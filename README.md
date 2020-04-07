# bHaptics Player 1.6.0 자바스크립트용 API 문서 

### 전제 조건

bHaptics Player 1.6.0이 컴퓨터에 설치되어 있고 실행되어야 함

### 사용 목적

이 문서는 bHaptics Haptic 기기를 활용한 어플리케이션 개발을 하려는 개발자를 위해서 작성 되었음.


### API를 이용하여 수행할 수 있는 업무 
1) 게임에 비햅틱스 햅틱 기기 연동
2) VR 교육 어플리케이션에 비햅틱스 햅틱 기기 연동 
3) 이외에도 햅틱이 필요한 다양한 어플리케이션에서 API를 사용할 수 있음 

### 예제 프로그램
* https://elated-noyce-f0332a.netlify.com/


### 시작 설정하기
##### 1. Npm이용하여 설치 

```
npm install tact-js
```

##### 2. 소스코드에서 라이브러리 사용하기
```javascript
import tactJs from 'tact-js'
```

##### 3. bHaptics 플레이어와의 연결 확인 하기

연결된 이후(Connected)부터 API 사용 가능함
```
연결 상태: Connected | Disconnected | Connecting
```

```javascript
tactJs.addListener(function(msg) {
  if (msg.status === 'Connected') {
     // bHaptics Player와 연결됨
  } else if (msg.status === 'Disconnected') {
    // bHaptics Player와 연결 안됨
  } else if (msg.status === 'Connecting') {
    // bHaptics Player와 연결중
  }
});

```



### API 상세
##### 1. Dot Mode - submitDot()
```
모터각각을 개별 컨트롤하는 함수
```

* Parameters
```
key: string;
position: 'VestFront' | 'VestBack' | 'Head' | 'ForearmL' | 'ForearmR'
points: array of object with (index, intensity)
  * index:  [0, 19] (VestFront|VestBack) or [0, 5] (Head|ForearmL|ForearmR)
  * intensity: [0, 100] 
durationMillis: [20, 10000]
```
* Return Type: ErrorCode

* 예제
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

##### 2. PathMode - submitPath()
```
아래 그림과 같은 가상의 x, y 좌표(0, 1)를 이용하여 모터를 컨트롤 하는 함수
```

![image](https://user-images.githubusercontent.com/1837913/78652285-7d72f900-78fc-11ea-9b1c-62a2d527d2a8.png)

* Parameters
```
key: string;
position: 'VestFront' | 'VestBack' | 'Head' | 'ForearmL' | 'ForearmR'
points: array of object with (x, y, intensity)
      * x: [0, 1]
      * y: [0, 1]
      * intensity: [0, 100] 
durationMillis: [20, 10000]
```
  
* Return Type: ErrorCode
  
* 예제
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


##### 3.1. Tact File - registerFile()
```
미리 정의된 햅틱 패턴(tact file)을 사용하기 위하여 등록하는 함수. 
submitRegistered(), submitRegisteredWithRotationOption(), 
submitRegisteredWithScaleOption() 를 호출 하기 전에 먼저 등록하여야 함
```

* Parameters
```
key: string;
tactFile: provided *.tact file
```

* Return Type: ErrorCode

* 예제
```javascript
var key = 'key';
var tactFile = '{"project":{"createdAt":1583739337216,"description":"","layout":{"layouts":{"For...' // tact file string
var errorCode = tactJs.registerFile(key, tactFile);
```

##### 3.2. Tact File - submitRegistered()
```
등록한 햅틱 패턴(tact file)을 실행하는 함수
```

* Parameters
```
key: string;
```
* Return Type: ErrorCode

* 예제
```javascript
var errorCode = tactJs.submitRegistered(key);
```

##### 3.3. Tact File - submitRegisteredWithRotationOption()
```
등록한 햅틱 패턴(tact file)의 위치를 변경하여 실행시키는 함수 (TACTOT 햅틱 패턴에만 사용 가능)

예를들어, 총에 맞는 위치가 동적으로 바뀔때 그 위치에 따라 피드백을 주고 싶을때 사용
앞에 맞았을 때는 offsetAngleX을 0으로, 뒤에 맞았을 때는 offsetAngleX을 180도로 설정
이와 비슷하게 몸통 위를 맞으면 offsetY를 0.5로, 몸통아래를 맞으면 -0.5로 설정
```

* Parameters
```
key: string;
rotationOption: object with (offsetAngleX, offsetY)
 * offsetAngleX: [0, 360]
 * offsetY: [-0.5, 0.5]
```
 
* Return Type: ErrorCode
 
* 예제
```javascript
var key = 'key';
var rotationOption = {offsetAngleX: 180, offsetY: 0.2};
var errorCode = tactJs.submitRegisteredWithRotationOption(key, rotationOption);
```

##### 3.4. Tact File - submitRegisteredWithScaleOption()
```
등록한 햅틱 패턴(tact file)의 세기(intensity)와 길이(duration)를 변경하여 실행시키는 함수

세기와 길이는 원래의 햅틱 피드백에 곱해짐 
1) 세기 100짜리 햅틱 패턴에 intensity를 0.5로 설정하면 50짜리 햅틱 패턴으로 재생됨
2) 1초짜리 햅틱 패턴에 duration을 2로 설정하면 2초짜리 햅틱 패턴으로 재생됨
```
* Parameters
```
key: string;
scaleOption: object with (intensity, duration)
 * intensity: [0.2, 5] 
 * duration: [0.2, 5]
``` 

* Return Type: ErrorCode
 
* 예제
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
* 14: MESSAGE_INVALID_SCALE_INTENSITY_RATIO - intensity should be [0.2, 5]
* 15: MESSAGE_INVALID_SCALE_DURATION_RATIO - duration should be [0.2, 5]
* 16: MESSAGE_NOT_REGISTERED_KEY - key not registered




##### 최종 수정: 2020년 4월 8일
