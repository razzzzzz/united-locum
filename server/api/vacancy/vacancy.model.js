'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var VacancySchema = new mongoose.Schema({
  category: String,
  desc: String,
  skill: String,
  count: Number,
  rate: Number,
  date: Date,
  from: Date,
  to: Date,
  practiceId: String,
  proposedUsers: {
        type: Array
    }
});

export default mongoose.model('Vacancy', VacancySchema);
