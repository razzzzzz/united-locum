'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var VacancySchema = new mongoose.Schema({
  category: String,
  desc: String,
  skill: String,
  count: Number,
  rate: Number,
  date: Date,
  time: Date
});

export default mongoose.model('Vacancy', VacancySchema);
