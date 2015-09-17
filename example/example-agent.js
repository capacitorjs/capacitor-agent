'use strict';

var CapacitorAgent = require('../lib/capacitor-agent');

var agent = new CapacitorAgent({
  displayName: 'capacitor-example',
  channelName: 'github.com/capacitorjs/capacitor-agent/example'
});

agent.startDevtools('/example-plugin.bin.js');

document.getElementById('inc').addEventListener('click', function () {
  agent.emit('plugin:inc');
});

var count = 0;
agent.on('agent:inc', function () {
  count += 1;
  document.getElementById('counter').innerHTML = count;
});