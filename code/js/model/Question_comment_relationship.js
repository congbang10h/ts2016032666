//ID: dd72a43f7ae8abcf6e430906fc9705df
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_comment_relationship_id',   type: 'int', title: 'question_comment_relationship_id'},
		{name: 'parent_question_comment_id',         type: 'int', title: 'parent_question_comment_id'},
		{name: 'child_question_comment_id',          type: 'int', title: 'child_question_comment_id'},
		{name: 'question_comment_relationship_desc', type: 'string', title: 'question_comment_relationship_desc'}
	],
	actionName: 'Question_comment_relationship',
	validations: [
		{type: 'length', field: 'question_comment_relationship_desc', message: 'Thông tin [question_comment_relationship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});