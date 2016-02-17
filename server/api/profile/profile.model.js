'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProfileSchema = new mongoose.Schema({
			userId: String,
			profileSummary: String,
			qualifications: { 
								type: Array 
							},
			currentAddress:{
								houseNumber: String,
								line1: String,
								line2: String,
								line3: String,
								town: String,
								country: String,
								zipCode : Number
							},
			sa: Boolean,
			billingAddress:{
								houseNumber: String,
								line1: String,
								line2: String,
								line3: String,
								town: String,
								country: String,
								zipCode : Number
							},
			documents: {
						type: Array 
						},
			practices: {
						type:Array
						},
			services: String,
			socialAccont:{
							fb: String,
							linkedin: String,
							skype: String,
							twitter: String,
							pinterest: String
						},
			references: {
							type:Array
						},
			nhsSys: {
						type: Array
					},
			sessionRates: {
							session1: { frm: Date, to: Date, rate: Number },
							session2: { frm: Date, to: Date, rate: Number },
							session3: { frm: Date, to: Date, rate: Number },
							dayRate: Number,
							outOfOffice: Number
						}
});

export default mongoose.model('Profile', ProfileSchema);
