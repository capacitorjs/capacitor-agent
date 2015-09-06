'use strict';

var CapacitorAgent = require('../lib/capacitor-agent');

var agent = new CapacitorAgent({
  channelName: 'github.com/capacitorjs/capacitor:example'
});
agent.startDevtools('/example-plugin.js');

document.getElementById('inc').addEventListener('click', function () {
  agent.emit('plugin:inc');
});

var count = 0;
agent.on('agent:inc', function () {
  count += 1;
  document.getElementById('counter').innerHTML = count;
});