//ID: 7d105410a85d11fc66123e9c23a07a15
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_taker_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_taker_comment_relationship_id',   type: 'int', title: 'question_taker_comment_relationship_id'},
		{name: 'parent_question_taker_comment_id',         type: 'int', title: 'parent_question_taker_comment_id'},
		{name: 'child_question_taker_comment_id',          type: 'int', title: 'child_question_taker_comment_id'},
		{name: 'question_taker_comment_relationship_desc', type: 'string', title: 'question_taker_comment_relationship_desc'}
	],
	actionName: 'Question_taker_comment_relationship',
	validations: [
		{type: 'length', field: 'question_taker_comment_relationship_desc', message: 'Thông tin [question_taker_comment_relationship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_taker_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});