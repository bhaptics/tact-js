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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);
    }

    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(event, listener) {
            if (typeof listener !== 'function') {
                throw new TypeError('Listener must be a function');
            }
            if (!this.events_) {
                this.events_ = {};
            }

            this.emit('newListener', event, listener);

            if (!this.events_[event]) {
                this.events_[event] = [];
            }

            this.events_[event].push(listener);

            return this;
        }
    }, {
        key: 'listeners',
        value: function listeners(event) {
            return this.events_ && this.events_[event];
        }
    }, {
        key: 'emit',
        value: function emit(event) {
            var listeners = this.listeners(event);
            if (listeners) {
                var args = Array.prototype.slice.call(arguments, 1);
                for (var i = 0; i < listeners.length; i++) {
                    if (listeners[i]) {
                        listeners[i].apply(this, args);
                    }
                }
                return true;
            }
            return false;
        }
    }, {
        key: 'once',
        value: function once(event, listener) {
            var _this = this,
                _arguments = arguments;

            this.on(event, function (handlerInternal) {
                _this.removeListener(event, handlerInternal);
                listener.apply(_this, _arguments);
            });
        }
    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners(opt_event) {
            if (!this.events_) {
                return this;
            }
            if (opt_event) {
                delete this.events_[opt_event];
            } else {
                delete this.events_;
            }
            return this;
        }
    }, {
        key: 'removeListener',
        value: function removeListener(event, listener) {
            if (typeof listener !== 'function') {
                throw new TypeError('Listener must be a function');
            }
            if (!this.events_) {
                return this;
            }

            var listeners = this.listeners(event);
            if (Array.isArray(listeners)) {
                var i = listeners.indexOf(listener);
                if (i < 0) {
                    return this;
                }
                listeners.splice(i, 1);
            }

            return this;
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tacsocket = __webpack_require__(3);

var _Tacsocket2 = _interopRequireDefault(_Tacsocket);

var _EventEmitter2 = __webpack_require__(0);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hapticPlayer = function (_EventEmitter) {
    _inherits(hapticPlayer, _EventEmitter);

    function hapticPlayer() {
        _classCallCheck(this, hapticPlayer);

        var _this = _possibleConstructorReturn(this, (hapticPlayer.__proto__ || Object.getPrototypeOf(hapticPlayer)).call(this));

        _this.socket = new _Tacsocket2.default();
        _this.handlers = [];
        _this.message = {};

        _this.socket.on('change', function (message) {
            _this.message = message;
            _this.emit('change', _this.message);
        });
        return _this;
    }

    _createClass(hapticPlayer, [{
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
}(_EventEmitter3.default);

exports.default = hapticPlayer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapticPlayer = __webpack_require__(1);

var _hapticPlayer2 = _interopRequireDefault(_hapticPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _hapticPlayer2.default;

window.hapticPlayer = _hapticPlayer2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(0);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultURL = 'ws://127.0.0.1:15881/v2/feedbacks';

var STATUS = {
    CONNECTING: 'Connecting',
    CONNECTED: 'Connected',
    DISCONNECT: 'Disconnected'
};

var Tacsocket = function (_EventEmitter) {
    _inherits(Tacsocket, _EventEmitter);

    function Tacsocket(retryConnectTime) {
        _classCallCheck(this, Tacsocket);

        var _this = _possibleConstructorReturn(this, (Tacsocket.__proto__ || Object.getPrototypeOf(Tacsocket)).call(this));

        _this.handlers = [];
        _this.message = {};
        _this.websocketClient;
        _this.DEFAULT_RETRY_CONNECT_TIME = 5000;
        _this.retryConnectTime = retryConnectTime || _this.DEFAULT_RETRY_CONNECT_TIME;
        _this.currentStatus = STATUS.DISCONNECT;
        _this.connect();
        return _this;
    }

    _createClass(Tacsocket, [{
        key: 'connect',
        value: function connect() {
            var _this2 = this;

            try {
                this.websocketClient = new WebSocket(defaultURL);
            } catch (e) {
                console.log(e);
                return;
            }

            this.websocketClient.onopen = function () {
                _this2.currentStatus = STATUS.CONNECTED;
                _this2.emit('change', {
                    status: _this2.currentStatus,
                    message: _this2.message
                });
            };

            this.websocketClient.onmessage = function (result) {
                if (JSON.stringify(_this2.message) === result.data) {
                    return;
                }

                _this2.message = JSON.parse(result.data);
                _this2.emit('change', {
                    status: _this2.currentStatus,
                    message: _this2.message
                });
            };

            this.websocketClient.onclose = function (event) {
                _this2.currentStatus = STATUS.DISCONNECT;
                _this2.emit('change', {
                    status: _this2.currentStatus,
                    message: _this2.message
                });
                setTimeout(function () {
                    _this2.connect();
                }, _this2.retryConnectTime);
            };

            this.currentStatus = STATUS.CONNECTING;
            this.emit('change', {
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

            if (this.currentStatus !== STATUS.CONNECTED) {
                return;
            }

            try {
                this.websocketClient.send(message);
            } catch (e) {}
        }
    }]);

    return Tacsocket;
}(_EventEmitter3.default);

exports.default = Tacsocket;

/***/ })
/******/ ]);
//# sourceMappingURL=tact.js.map