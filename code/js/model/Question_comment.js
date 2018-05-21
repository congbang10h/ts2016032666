//ID: 0e51961a58cb425f2c25cd9a9091332e
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_comment_id',       type: 'int', title: 'question_comment_id'},
		{name: 'test_reviewer_decision_id', type: 'int', title: 'test_reviewer_decision_id'},
		{name: 'test_comment_id',           type: 'int', title: 'test_comment_id'},
		{name: 'question_id',               type: 'int', title: 'question_id'},
		{name: 'question_comment_date',     type: 'date', title: 'question_comment_date'},
		{name: 'question_comment_time',     type: 'datetime', title: 'question_comment_time'},
		{name: 'question_comment_desc',     type: 'string', title: 'question_comment_desc'}
	],
	actionName: 'Question_comment',
	validations: [
		{type: 'presence', field: 'question_id', message: 'Chưa nhập thông tin [question_id]'},
		{type: 'presence', field: 'question_comment_date', message: 'Chưa nhập thông tin [question_comment_date]'},
		{type: 'presence', field: 'question_comment_time', message: 'Chưa nhập thông tin [question_comment_time]'},
		{type: 'presence', field: 'question_comment_desc', message: 'Chưa nhập thông tin [question_comment_desc]'},
		{type: 'length', field: 'question_comment_desc', message: 'Thông tin [question_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});