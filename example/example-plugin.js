(function () {
  'use strict';

  var el = document.createElement('div');

  var plugin = {
    name: 'capacitor-example',

    start: function (options) {
      this.emitter = options.emitter;
      var count = 0;
      el.innerHTML = count;
      this.emitter.on('inc', function () {
        count += 1;
        el.innerHTML = count;
      });
    },

    render: function () {
      return el;
    }
  };

  window.registerPlugin('github.com/capacitorjs/capacitor:example', plugin);
}());