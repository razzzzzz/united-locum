'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DairySchema = new mongoose.Schema({
		 locumId: String,
         lName: String,
         practiceId: String,
         pName: String,
         skill: String,
         skillId: String,
         date: Date,
         time: Date,
         state: {
	        type: Array
         },
         stateId: String,
         activity: String,
         vacancy: Number,
         rate: Number,
         text: String,
		 colorCode: {
			 type: Array
		 },
		 category: {
			 type: Array
		 },
		 jobDescription: String,
		 zipCode: Number,
		 typeHealthcare: String
});

export default mongoose.model('Dairy', DairySchema);
