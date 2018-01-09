'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./public/dist/main.bundle.js');
} else {
    module.exports = require('./public/dist/main.bundle.js');
}