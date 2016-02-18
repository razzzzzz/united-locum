/**
 * Notification model events
 */

'use strict';

import {EventEmitter} from 'events';
var Notification = require('./notification.model');
var NotificationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NotificationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Notification.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    NotificationEvents.emit(event + ':' + doc._id, doc);
    NotificationEvents.emit(event, doc);
  }
}

export default NotificationEvents;
