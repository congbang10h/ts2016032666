//ID: cd0c1310f8ae2db7aa2ad4a9d37d5c56
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Program_access_mode', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'program_access_mode_id',              type: 'int', title: 'program_access_mode_id'},
		{name: 'edu_program_id',                      type: 'int', title: 'edu_program_id'},
		{name: 'role_id',                             type: 'int', title: 'role_id'},
		{name: 'grantor_id',                          type: 'int', title: 'grantor_id'},
		{name: 'previlege_id',                        type: 'int', title: 'previlege_id'},
		{name: 'accessor_id',                         type: 'int', title: 'accessor_id'},
		{name: 'program_access_mode_granted_date',    type: 'date', title: 'program_access_mode_granted_date'},
		{name: 'program_access_mode_valid_startdate', type: 'date', title: 'program_access_mode_valid_startdate'},
		{name: 'program_access_mode_valid_enddate',   type: 'date', title: 'program_access_mode_valid_enddate'},
		{name: 'program_access_mode_valid_starttime', type: 'datetime', title: 'program_access_mode_valid_starttime'},
		{name: 'program_access_mode_valid_endtime',   type: 'datetime', title: 'program_access_mode_valid_endtime'},
		{name: 'program_access_mode_is_disabled',     type: 'int', title: 'program_access_mode_is_disabled'},
		{name: 'program_access_mode_desc',            type: 'string', title: 'program_access_mode_desc'}
	],
	actionName: 'Program_access_mode',
	validations: [
		{type: 'presence', field: 'program_access_mode_granted_date', message: 'Chưa nhập thông tin [program_access_mode_granted_date]'},
		{type: 'presence', field: 'program_access_mode_valid_startdate', message: 'Chưa nhập thông tin [program_access_mode_valid_startdate]'},
		{type: 'presence', field: 'program_access_mode_is_disabled', message: 'Chưa nhập thông tin [program_access_mode_is_disabled]'},
		{type: 'length', field: 'program_access_mode_desc', message: 'Thông tin [program_access_mode_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Program_access_mode,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});