'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var VacancySchema = new mongoose.Schema({
  category: String,
  desc: String,
  skill: String,
  count: Number,
  rate: Number,
  date: Date,
  time: Date,
  practiceId: String,
  practiceEmail:  {
		    type: String,
		    lowercase: true
		  },
  practiceFname: String,
  practiceLname: String,
  practiceTel: Number,
  practiceAdd: String
});

export default mongoose.model('Vacancy', VacancySchema);
