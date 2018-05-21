//ID: 7adb05a99096ebbd8f95c226d5ea474a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_comment_id',           type: 'int', title: 'course_comment_id'},
		{name: 'course_access_mode_id',       type: 'int', title: 'course_access_mode_id'},
		{name: 'course_reviewer_decision_id', type: 'int', title: 'course_reviewer_decision_id'},
		{name: 'course_comment_date',         type: 'date', title: 'course_comment_date'},
		{name: 'course_comment_time',         type: 'datetime', title: 'course_comment_time'},
		{name: 'course_comment_desc',         type: 'string', title: 'course_comment_desc'}
	],
	actionName: 'Course_comment',
	validations: [
		{type: 'presence', field: 'course_comment_date', message: 'Chưa nhập thông tin [course_comment_date]'},
		{type: 'presence', field: 'course_comment_time', message: 'Chưa nhập thông tin [course_comment_time]'},
		{type: 'presence', field: 'course_comment_desc', message: 'Chưa nhập thông tin [course_comment_desc]'},
		{type: 'length', field: 'course_comment_desc', message: 'Thông tin [course_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});