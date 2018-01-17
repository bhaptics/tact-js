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

    once(event, listener) {
        this.on(event,  handlerInternal => {
            this.removeListener(event, handlerInternal);
            listener.apply(this, arguments);
        });
    }

    removeAllListeners(opt_event) {
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

    removeListener(event, listener) {
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
}