'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var Non_availabilitySchema = new mongoose.Schema({
			date: Date,
			time: {
					session1: { frm: Date, to: Date, rate: Number }
					},
			activity: String,

});

export default mongoose.model('Non_availability', Non_availabilitySchema);
