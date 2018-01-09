# Haptic Library for javascript

## Prerequisite
* bHaptics Player has to be installed (window)
* mac will be supported soon.

## Getting Started 

```
# Open public/index.html directory in browser (Example code)
```

## How to use
```javascript
var player = new hapticPlayer();

player.on('change', function(msg) {
    if (msg.status === 'Connected') {
        console.log('connected');
    }
});

var points = [{
    Index : 10,
    Intensity : 100
}];
player.submitDot('dot', 'Left', points, 1000);

```

* es6 with node
```javascript
import hapticPlayer from 'tact-js';
var player = new hapticPlayer();
```


## Build
```
$ npm install
$ npm run build
```

Copyright (c) 2017 bHaptics Inc. All rights reserved.
