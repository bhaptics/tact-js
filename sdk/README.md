![npm](https://img.shields.io/npm/v/tact-js)
![license](https://img.shields.io/npm/l/tact-js)
![CI](https://github.com/bhaptics/tact-js/workflows/CI/badge.svg)
![Code Quality](https://github.com/bhaptics/tact-js/workflows/Code%20Quality/badge.svg)
![npm downloads](https://img.shields.io/npm/dm/tact-js)

# bHaptics Web SDK

Web-based haptic control library for [bHaptics](https://www.bhaptics.com/) devices. A variety of haptic events can be played in your browser.

- Written in TypeScript
- Supports ESM

## ✨ Features

#### 🎮 Play events

Play haptic event exported from [bHaptics developer portal](https://developer.bhaptics.com/applications)

![video](https://github.com/user-attachments/assets/71c695fd-95d2-4e3c-82ed-a3390b685ddf)

#### 🔵 Dot mode

Play single-frame feedback with intensity-mapped dot values

![dot-mode](https://github.com/user-attachments/assets/74385edb-64c0-44ad-a205-5c0520ee8523)

#### 🧭 Path mode

Play directional feedback across the surface of a device

![path-mode](https://github.com/user-attachments/assets/d985e54e-a7f1-44ed-96bc-9f1dfe605078)

## 📦 Installation

```bash
npm install tact-js
# or
yarn add tact-js
# or
pnpm add tact-js
```

## 🚀 Quick Start

### Prerequisite

1. Download and install the [bHaptics Player](https://www.bhaptics.com/software/player/?type=pcplayer)
2. Make sure the Player is running
3. Connect your bHaptics Device to the Player
4. Ensure the Player version is vX.Y.Z or later

### Usage

#### Initialize the library

```ts
import Tact from 'tact-js';

// Initialize the library
Tact.init({
  appId: '<APP_ID>',
  apiKey: '<API_KEY>',
});
```

#### Play an event

```ts
import Tact, { PositionType } from 'tact-js';

// Play an event
Tact.play({ eventKey: key });
```

#### Play dot mode

```ts
import Tact, { PositionType } from 'tact-js';

// Play a dot
Tact.playDot({
  position: PositionType.Vest,  // e.g., Vest, Head, ForearmL, ForearmR etc.
  motorValues: [100, 0, ... , 0], // 0 ~ 100
});
```

#### Play path mode

```ts
import Tact, { PositionType } from 'tact-js';

// Play a path
Tact.playPath({
  position: PositionType.Vest,  // e.g., Vest, Head, ForearmL, ForearmR etc.
  x: [0.4, 0.42, ... , 1], // 0 ~ 1
  y: [0.5, 0.52, ... , 1], // 0 ~ 1
  intensity: [100, 89, ... , 49], // 0 ~ 100
});
```

## 📚 API

#### `Tact.init(params: InitParams): void`

- Initialize the library
- `params`:
  - `appId`: string - Your application ID
  - `apiKey`: string - Your API key
  - `remote`?: string - (Optional) Remote IP address and Port number of the bHaptics Player (ex. "192.168.0.123:15881")

#### `Tact.play(params: PlayParams): void`

- Play an event
- `params`:
  - `eventKey`: string - Event key
  - `startTime`?: number - Start time in milliseconds
  - `intensityRatio`?: number - Intensity ratio
  - `durationRatio`?: number - Duration ratio
  - `offsetX`?: number - Offset X
  - `offsetY`?: number - Offset Y

#### `Tact.playDot(params: PlayDotParams): void`

- Play a dot
- `params`:
  - `position`: PositionType - Position type
  - `motorValues`: number[] - Motor values
  - `duration`?: number - Duration in milliseconds

#### `Tact.playPath(params: PlayPathParams): void`

- Play a path
- `params`:
  - `position`: PositionType - Position type
  - `x`: number[] - X values
  - `y`: number[] - Y values
  - `intensity`: number[] - Intensity values
  - `duration`?: number - Duration in milliseconds

## 🛠 Troubleshooting

### Vite

If you are using Vite, you may need to add the following to your `vite.config.js` file:

```js
export default defineConfig({
  // ...
  optimizeDeps: {
    exclude: ['tact-js'],
  },
  // ...
});
```

## Demo

- Online demo: [tact-js](https://tact-js2-demo.vercel.app/)
- Local demo: Check the `demo/` directory for a minimal setup example

## 🪪 License

bHaptics License
