/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tacsocket = __webpack_require__(2);

var _Tacsocket2 = _interopRequireDefault(_Tacsocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hapticPlayer = function () {
    function hapticPlayer() {
        var _this = this;

        _classCallCheck(this, hapticPlayer);

        this.socket = new _Tacsocket2.default();
        this.handlers = [];
        this.message = {};

        this.socket.on('change', function (message) {
            _this.message = message;
            _this._publish('change', _this.message);
        });
    }

    _createClass(hapticPlayer, [{
        key: '_publish',
        value: function _publish(event, args) {
            this.handlers.forEach(function (topic) {
                if (topic.event === event) {
                    topic.handler(args);
                }
            });
        }
    }, {
        key: 'on',
        value: function on(event, handler, context) {
            if (typeof context === 'undefined') {
                context = handler;
            }
            this.handlers.push({ event: event, handler: handler.bind(context) });

            this._publish('change', this.message);
        }
    }, {
        key: 'turnOff',
        value: function turnOff(position) {
            var request = {
                Submit: [{
                    Type: 'turnOff',
                    Key: position
                }]
            };
            this.socket.send(JSON.stringify(request));
        }
    }, {
        key: 'turnOffAll',
        value: function turnOffAll() {
            var request = {
                Submit: [{
                    Type: 'turnOffAll'
                }]
            };
            this.socket.send(JSON.stringify(request));
        }
    }, {
        key: 'submitDot',
        value: function submitDot(key, pos, dotPoints, durationMillis) {
            var request = {
                Submit: [{
                    Type: 'frame',
                    Key: key,
                    Frame: {
                        Position: pos,
                        PathPoints: [],
                        DotPoints: dotPoints,
                        DurationMillis: durationMillis
                    }
                }]
            };
            this.socket.send(JSON.stringify(request, function (key, val) {
                return val.toFixed ? Number(val.toFixed(3)) : val;
            }));
        }
    }, {
        key: 'submitPath',
        value: function submitPath(key, pos, pathPoints, durationMillis) {
            var request = {
                Submit: [{
                    Type: 'frame',
                    Key: key,
                    Frame: {
                        Position: pos,
                        PathPoints: pathPoints,
                        DotPoints: [],
                        DurationMillis: durationMillis
                    }
                }]
            };
            this.socket.send(JSON.stringify(request, function (key, val) {
                return val.toFixed ? Number(val.toFixed(3)) : val;
            }));
        }
    }]);

    return hapticPlayer;
}();

exports.default = hapticPlayer;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultURL = 'ws://localhost:15881/v2/feedbacks';
var status = {
    connecting: 'Connecting',
    connected: 'Connected',
    disconnect: 'Disconnected'
};

var Tacsocket = function () {
    function Tacsocket() {
        _classCallCheck(this, Tacsocket);

        this.handlers = [];
        this.message = {};
        this.websocketClient;
        this.currentStatus = status.disconnect;
        this.connect();
    }

    _createClass(Tacsocket, [{
        key: 'publish',
        value: function publish(event, args) {
            this.handlers.forEach(function (topic) {
                if (topic.event === event) {
                    topic.handler(args);
                }
            });
        }
    }, {
        key: 'on',
        value: function on(event, handler, context) {
            if (typeof context === 'undefined') {
                context = handler;
            }
            this.handlers.push({ event: event, handler: handler.bind(context) });

            this.publish('change', {
                status: this.currentStatus,
                message: this.message
            });
        }
    }, {
        key: 'connect',
        value: function connect() {
            var _this = this;

            try {
                this.websocketClient = new WebSocket(defaultURL);
            } catch (e) {
                console.log(e);
                return;
            }

            this.websocketClient.onopen = function () {
                _this.currentStatus = status.connected;
                _this.publish('change', {
                    status: _this.currentStatus,
                    message: _this.message
                });
            };

            this.websocketClient.onmessage = function (result) {
                if (JSON.stringify(_this.message) === result.data) {
                    return;
                }

                _this.message = JSON.parse(result.data);
                _this.publish('change', {
                    status: _this.currentStatus,
                    message: _this.message
                });
            };

            this.websocketClient.onclose = function (event) {
                _this.currentStatus = status.disconnect;
                _this.publish('change', {
                    status: _this.currentStatus,
                    message: _this.message
                });
                setTimeout(function () {
                    this.connect();
                }, 5000);
            };

            this.currentStatus = status.connecting;
            this.publish('change', {
                status: this.currentStatus,
                message: this.message
            });
        }
    }, {
        key: 'send',
        value: function send(message) {
            if (message === undefined) {
                return;
            }

            if (this.websocketClient === undefined) {
                return;
            }

            if (this.currentStatus !== status.connected) {
                return;
            }

            try {
                this.websocketClient.send(message);
            } catch (e) {}
        }
    }]);

    return Tacsocket;
}();

exports.default = Tacsocket;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hapticPlayer = __webpack_require__(0);

var _hapticPlayer2 = _interopRequireDefault(_hapticPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.hapticPlayer = _hapticPlayer2.default;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map