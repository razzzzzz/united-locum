'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var Reason_nonavailabilitySchema = new mongoose.Schema({
			date: Date,
			time: {
					session1: { frm: Date, to: Date, rate: Number }
					},
			activity: String,

});

export default mongoose.model('Reason_nonavailability', Reason_nonavailabilitySchema);
