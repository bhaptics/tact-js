# bHaptics SDK for WebOS (v0.1.3)

### Getting Started

```html
<head>
	<!-- Have to write script like below 2-line for using in webOSTV -->
	<script src="webOSTVjs-1.2.4/webOSTV-dev.js" charset="utf-8"></script>
	<script src="webOSTVjs-1.2.4/webOSTV.js" charset="utf-8"></script>
	<!-- /**********************************************************/ -->

	<script type="module" src="./src/bhaptics.js"></script>
    ...
</head>
<body>
    ...
</body>
```

### Usage


```html
<head>
    ...
	<script type="module" type="text/javascript">
		bhaptics.printSdkInfo() // "bhaptics SDK for LG WebOS TV: v0.1.3"
		bhaptics.initBhapticsFromJson("lg-tv-sample-events-vest.json")

        // NOTE: uses your address!!
        bhaptics.startScanDeviceAndConnect('YOUR-TACTSUIT-MAC-ADDRESS') 

        // play 'pingbody' event
        bhaptics.play("pingbody") 
	</script>
</head>
```

### How to install SDK testing App and connect device.

1. Packaging and install

    ```bash
    ares-package ./ && ares-install ./com.bhaptics.sdk_0.1.3_all.ipk
    ```
2. Run bHaptics App

    <img src="./icon.png" width="256px" height="256px" title="bHaptics_Logo"/>

3. check your device's mac address
4. Click __startScanDevice()__ button
5. Click __check connected device__ button, When it turns to Green, it means connected.
6. Test haptic events with TactSuit, and test magic remote's sensor data in console.log.


### Run on local server

(not working BLE and Magic Remote)

```shell
# change ip(192.168.0.1) to your local network ip
npx live-server --host=192.168.0.1
`