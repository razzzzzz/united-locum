/**
 * Non_availability model events
 */

'use strict';

import {EventEmitter} from 'events';
var Non_availability = require('./non_availability.model');
var Non_availabilityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Non_availabilityEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Non_availability.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Non_availabilityEvents.emit(event + ':' + doc._id, doc);
    Non_availabilityEvents.emit(event, doc);
  }
}

export default Non_availabilityEvents;
