/**
 * Reason_nonavailability model events
 */

'use strict';

import {EventEmitter} from 'events';
var Reason_nonavailability = require('./reason_nonavailability.model');
var Reason_nonavailabilityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Reason_nonavailabilityEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Reason_nonavailability.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Reason_nonavailabilityEvents.emit(event + ':' + doc._id, doc);
    Reason_nonavailabilityEvents.emit(event, doc);
  }
}

export default Reason_nonavailabilityEvents;
