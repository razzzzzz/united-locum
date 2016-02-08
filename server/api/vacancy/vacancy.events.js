/**
 * Vacancy model events
 */

'use strict';

import {EventEmitter} from 'events';
var Vacancy = require('./vacancy.model');
var VacancyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VacancyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vacancy.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VacancyEvents.emit(event + ':' + doc._id, doc);
    VacancyEvents.emit(event, doc);
  }
}

export default VacancyEvents;
