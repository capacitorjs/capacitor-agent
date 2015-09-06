(function () {
  'use strict';

  var el = document.createElement('div');

  var plugin = {
    name: 'capacitor-example',

    start: function (options) {
      this.emitter = options.emitter;
      var count = 0;
      var counter = document.createElement('div');
      counter.innerHTML = count;

      var button = document.createElement('button');
      button.innerHTML = "increase other count";
      button.addEventListener('click', function () {
        this.emitter.emit('tunnel:agent', 'agent:inc');
      }.bind(this));

      el.appendChild(counter);
      el.appendChild(button);

      this.emitter.on('plugin:inc', function () {
        count += 1;
        counter.innerHTML = count;
      });
    },

    render: function () {
      return el;
    }
  };

  window.registerPlugin('github.com/capacitorjs/capacitor:example', plugin);
}());