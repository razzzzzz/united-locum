'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var NotificationSchema = new mongoose.Schema({
 		targetId:{type:String},
		requestId:{type:String},
		requestName:{	
			first:{type:String},
			last:{type:String}
			},
		pic:{type:String},
		subject:{
			Skill:{type:String},
			Rate:{type:Number},
			RequestTime: Date,
			},
		body:{Type:String},
		notifyTimeStamp: Date,
		deliveryStatus:Boolean,
		readStatus:Boolean
});

export default mongoose.model('Notification', NotificationSchema);
