var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var userSchema = new mongoose.Schema({
	time:{ type: Date, default: Date.now },
	tel:String,
	password:String,
	alias:{ type: String, default: '' },
	brief:{ type: String, default: '' },
	headImages:{ type: [String], default: [] },//个人相册图片网址，第一张为头像
	age:{ type: Number, default: 0 },//年龄
	location:{ type: String, default: '' },//位置
	sex:{ type: Boolean, default: true },//性别
	lastOnline:{ type: Date, default: Date.now },//最后在线时间
	extra:{ type: String, default: '{}' }//json 字符串，存储额外信息
});

userSchema.plugin(autoIncrement.plugin, 'User');
mongoose.model('User', userSchema);
