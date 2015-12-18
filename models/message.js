var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	time:{ type: Date, default: Date.now },
	content:String,
	sender:Number,
	receiver:Number
});

mongoose.model('Message', messageSchema);