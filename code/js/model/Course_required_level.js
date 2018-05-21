//ID: f79ee7bf2b6e4f6912ffad0ec9ce4d42
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_required_level', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_required_level_id',   type: 'int', title: 'course_required_level_id'},
		{name: 'course_required_level_code', type: 'string', title: 'course_required_level_code'},
		{name: 'course_required_level_desc', type: 'string', title: 'course_required_level_desc'}
	],
	actionName: 'Course_required_level',
	validations: [
		{type: 'presence', field: 'course_required_level_code', message: 'Chưa nhập thông tin [course_required_level_code]'},
		{type: 'length', field: 'course_required_level_code', message: 'Thông tin [course_required_level_code] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'course_required_level_desc', message: 'Chưa nhập thông tin [course_required_level_desc]'},
		{type: 'length', field: 'course_required_level_desc', message: 'Thông tin [course_required_level_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_required_level,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});