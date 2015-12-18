var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var userSchema = new mongoose.Schema({
	time:{ type: Date, default: Date.now },
	tel:String,
	password:String,
	alias:{ type: String, default: '' },
	brief:{ type: String, default: '' },
	headImages:{ type: [String], default: [] },//�������ͼƬ��ַ����һ��Ϊͷ��
	age:{ type: Number, default: 0 },//����
	location:{ type: String, default: '' },//λ��
	sex:{ type: Boolean, default: true },//�Ա�
	lastOnline:{ type: Date, default: Date.now },//�������ʱ��
	extra:{ type: String, default: '{}' }//json �ַ������洢������Ϣ
});

userSchema.plugin(autoIncrement.plugin, 'User');
mongoose.model('User', userSchema);
