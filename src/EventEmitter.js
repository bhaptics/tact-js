export default class EventEmitter {
  on(event, listener) {
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

  listeners(event) {
    return this.events_ && this.events_[event];
  }

  emit(event) {
    const listeners = this.listeners(event);
    if (listeners) {
      const args = Array.prototype.slice.call(arguments, 1);
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i]) {
          listeners[i].apply(this, args);
        }
      }
      return true;
    }
    return false;
  }

    once(event, listener) {
      this.on(event,  handlerInternal => {
        this.removeListener(event, handlerInternal);
        listener.apply(this, arguments);
      });
    }

    removeAllListeners(optEvent) {
      if (!this.events_) {
        return this;
      }
      if (optEvent) {
        delete this.events_[optEvent];
      } else {
        delete this.events_;
      }
      return this;
    }

    removeListener(event, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('Listener must be a function');
      }
      if (!this.events_) {
        return this;
      }

      const listeners = this.listeners(event);
      if (Array.isArray(listeners)) {
        const i = listeners.indexOf(listener);
        if (i < 0) {
          return this;
        }
        listeners.splice(i, 1);
      }

      return this;
    }
}