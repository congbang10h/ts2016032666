//ID: 8c8ee01eafe0a5762b5dac03b061fca2
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_content', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_content_id',         type: 'int', title: 'course_content_id'},
		{name: 'course_parentcontent_id',   type: 'int', title: 'course_parentcontent_id'},
		{name: 'course_id',                 type: 'int', title: 'course_id'},
		{name: 'course_content_code',       type: 'string', title: 'course_content_code'},
		{name: 'course_content_name',       type: 'string', title: 'course_content_name'},
		{name: 'course_content_desc',       type: 'string', title: 'course_content_desc'},
		{name: 'course_content_percentage', type: 'int', title: 'course_content_percentage'},
		{name: 'course_content_order',      type: 'int', title: 'course_content_order'}
	],
	actionName: 'Course_content',
	validations: [
		{type: 'length', field: 'course_content_code', message: 'Thông tin [course_content_code] dài hơn 10 ký tự', max: 10},
		{type: 'length', field: 'course_content_name', message: 'Thông tin [course_content_name] dài hơn 200 ký tự', max: 200},
		{type: 'presence', field: 'course_content_desc', message: 'Chưa nhập thông tin [course_content_desc]'},
		{type: 'length', field: 'course_content_desc', message: 'Thông tin [course_content_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_content,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC
//ZoneC>
});