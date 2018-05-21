//ID: fe11b90db3ae49633e9bb4ee4fe2adb4
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Content_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'content_comment_id',          type: 'int', title: 'content_comment_id'},
		{name: 'course_comment_id',           type: 'int', title: 'course_comment_id'},
		{name: 'course_content_id',           type: 'int', title: 'course_content_id'},
		{name: 'course_reviewer_decision_id', type: 'int', title: 'course_reviewer_decision_id'},
		{name: 'content_comment_date',        type: 'date', title: 'content_comment_date'},
		{name: 'content_comment_time',        type: 'datetime', title: 'content_comment_time'},
		{name: 'content_comment_desc',        type: 'string', title: 'content_comment_desc'}
	],
	actionName: 'Content_comment',
	validations: [
		{type: 'presence', field: 'content_comment_date', message: 'Chưa nhập thông tin [content_comment_date]'},
		{type: 'presence', field: 'content_comment_time', message: 'Chưa nhập thông tin [content_comment_time]'},
		{type: 'presence', field: 'content_comment_desc', message: 'Chưa nhập thông tin [content_comment_desc]'},
		{type: 'length', field: 'content_comment_desc', message: 'Thông tin [content_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Content_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});