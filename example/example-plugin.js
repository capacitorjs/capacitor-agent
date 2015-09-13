'use strict';

/**
 * Runs in an iframe in capacitor
 */

var EventEmitter = require('events').EventEmitter;
var EmitterWindowBridge = require('../node_modules/capacitor-devtools-helpers').EmitterWindowBridge;

var emitter = new EventEmitter();
EmitterWindowBridge.proxyEvents(window.parent, window, emitter, 'tunnel:agent', 'tunnel:plugin');

function start() {
  var count = 0;
  var counter = document.createElement('div');
  var el = document.createElement('div');
  counter.innerHTML = count;

  var button = document.createElement('button');
  button.innerHTML = "increase other count";
  button.addEventListener('click', function () {
    emitter.emit('tunnel:agent', 'agent:inc');
  });

  el.appendChild(counter);
  el.appendChild(button);

  emitter.on('plugin:inc', function () {
    count += 1;
    counter.innerHTML = count;
  });

  document.body.appendChild(el);
  emitter.emit('tunnel:agent', 'plugin:ready');
}

emitter.once('plugin:start', start);

