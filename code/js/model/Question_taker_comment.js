//ID: 56f8c598f20846454ddfd6b19785015c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_taker_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_taker_comment_id',   type: 'int', title: 'question_taker_comment_id'},
		{name: 'test_taker_comment_id',       type: 'int', title: 'test_taker_comment_id'},
		{name: 'question_id',                 type: 'int', title: 'question_id'},
		{name: 'question_taker_comment_date', type: 'date', title: 'question_taker_comment_date'},
		{name: 'question_taker_comment_time', type: 'datetime', title: 'question_taker_comment_time'},
		{name: 'question_taker_comment_desc', type: 'string', title: 'question_taker_comment_desc'}
	],
	actionName: 'Question_taker_comment',
	validations: [
		{type: 'presence', field: 'question_taker_comment_desc', message: 'Chưa nhập thông tin [question_taker_comment_desc]'},
		{type: 'length', field: 'question_taker_comment_desc', message: 'Thông tin [question_taker_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_taker_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});