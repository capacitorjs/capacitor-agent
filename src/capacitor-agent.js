'use strict';

import {EventEmitter} from 'events';

const capacitorReady = new Promise(function (resolve) {
  if (window.__capacitor) {
    resolve(window.__capacitor);
  } else {
    const listener = function (event) {
      var message = event.data;
      if (
        event.source !== window
        || typeof message !== 'object'
        || message == null
        || message.name !== 'github.com/capacitorjs/capacitor:ready'
      ) {
        return;
      }
      resolve(window.__capacitor);
      window.removeEventListener('message', listener);
    };
    window.addEventListener('message', listener);
  }
});

export default class CapacitorAgent {
  constructor({channelName, enabled = true}) {
    this.channelName = channelName;
    this.enabled = enabled;
    this.emitter = new EventEmitter();
    ['on', 'once', 'removeListener', 'removeAllListeners'].forEach((key) => {
      this[key] = (...args) => {
        if (this.enabled) {
          this.emitter[key](...args);
        }
      }
    });
    this.agentReady = new Promise((resolve) => {
      this.resolveAgentReady = resolve;
    });
  }

  startDevtools(sourceFile) {
    capacitorReady.then((capacitor) => {
      return capacitor.registerPlugin(this, this.channelName, sourceFile);
    }).then(() => {
      this.emitter.once('plugin:ready', () => {
        this.resolveAgentReady();
      });
    });
  }

  emit(event, payload) {
    if (this.enabled) {
      this.agentReady.then(() => {
        this.emitter.emit('tunnel:plugin', event, payload);
      });
    }
    return this;
  }
}
