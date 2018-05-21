//ID: ef61fbf75f21769b3da8f3a3dfc8adbd
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Program_course_mapping', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'program_course_id',         type: 'int', title: 'program_course_id'},
		{name: 'course_id',                 type: 'int', title: 'course_id'},
		{name: 'edu_program_id',            type: 'int', title: 'edu_program_id'},
		{name: 'course_required_level_id',  type: 'int', title: 'course_required_level_id'},
		{name: 'program_course_time_index', type: 'int', title: 'program_course_time_index'}
	],
	actionName: 'Program_course_mapping',
	validations: [
		{type: 'presence', field: 'program_course_time_index', message: 'Chưa nhập thông tin [program_course_time_index]'}
	],
	proxy:{
		type: 'direct',
		api: Program_course_mapping,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});