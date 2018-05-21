//ID: ea1b05bfc6b07768506903f9cea564b5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Program_course_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'pcm_id',                   type: 'int', title: 'pcm_id'},
		{name: 'course_id',                type: 'int', title: 'course_id'},
		{name: 'course_required_level_id', type: 'int', title: 'course_required_level_id'},
		{name: 'edu_program_id',           type: 'int', title: 'edu_program_id'},
		{name: 'pcm_time_index',           type: 'int', title: 'pcm_time_index'}
	],
	actionName: 'Program_course_map',
	validations: [
		{type: 'presence', field: 'pcm_time_index', message: 'Chưa nhập thông tin [pcm_time_index]'}
	],
	proxy:{
		type: 'direct',
		api: Program_course_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});