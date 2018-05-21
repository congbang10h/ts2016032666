//ID: f0c7d149882805493514ded03a290eac
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Educational_program', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
		{name: 'univ_id',             type: 'int', title: 'univ_id'},
//ZoneF>
		{name: 'edu_program_id',         type: 'int', title: 'edu_program_id'},
		{name: 'faculty_id',             type: 'int', title: 'faculty_id'},
		{name: 'edu_program_code',       type: 'string', title: 'edu_program_code'},
		{name: 'edu_program_name_vn',    type: 'string', title: 'edu_program_name_vn'},
		{name: 'edu_program_name_en',    type: 'string', title: 'edu_program_name_en'},
		{name: 'edu_program_name_short', type: 'string', title: 'edu_program_name_short'},
		{name: 'edu_program_start_year', type: 'date', title: 'edu_program_start_year'},
		{name: 'edu_program_end_year',   type: 'date', title: 'edu_program_end_year'},
		{name: 'edu_program_desc',       type: 'string', title: 'edu_program_desc'},
		{name: 'edu_program_link',       type: 'string', title: 'edu_program_link'}
	],
	actionName: 'Educational_program',
	validations: [
		{type: 'presence', field: 'edu_program_code', message: 'Chưa nhập thông tin [edu_program_code]'},
		{type: 'length', field: 'edu_program_code', message: 'Thông tin [edu_program_code] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'edu_program_name_vn', message: 'Chưa nhập thông tin [edu_program_name_vn]'},
		{type: 'length', field: 'edu_program_name_vn', message: 'Thông tin [edu_program_name_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'edu_program_name_en', message: 'Chưa nhập thông tin [edu_program_name_en]'},
		{type: 'length', field: 'edu_program_name_en', message: 'Thông tin [edu_program_name_en] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'edu_program_name_short', message: 'Thông tin [edu_program_name_short] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'edu_program_start_year', message: 'Chưa nhập thông tin [edu_program_start_year]'},
		{type: 'length', field: 'edu_program_desc', message: 'Thông tin [edu_program_desc] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'edu_program_link', message: 'Thông tin [edu_program_link] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Educational_program,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});