//ID: 24c23cd3045a53f04365f7b6635b76ff
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Test_access_mode', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'test_access_mode_id',              type: 'int', title: 'test_access_mode_id'},
		{name: 'test_id',                          type: 'int', title: 'test_id'},
		{name: 'accessor_id',                      type: 'int', title: 'accessor_id'},
		{name: 'previlege_id',                     type: 'int', title: 'previlege_id'},
		{name: 'grantor_id',                       type: 'int', title: 'grantor_id'},
		{name: 'role_id',                          type: 'int', title: 'role_id'},
		{name: 'test_access_mode_granted_date',    type: 'date', title: 'test_access_mode_granted_date'},
		{name: 'test_access_mode_valid_startdate', type: 'date', title: 'test_access_mode_valid_startdate'},
		{name: 'test_access_mode_valid_enddate',   type: 'date', title: 'test_access_mode_valid_enddate'},
		{name: 'test_access_mode_valid_starttime', type: 'datetime', title: 'test_access_mode_valid_starttime'},
		{name: 'test_access_mode_valid_endtime',   type: 'datetime', title: 'test_access_mode_valid_endtime'},
		{name: 'test_access_mode_is_disabled',     type: 'int', title: 'test_access_mode_is_disabled'},
		{name: 'test_access_mode_desc',            type: 'string', title: 'test_access_mode_desc'}
	],
	actionName: 'Test_access_mode',
	validations: [
		{type: 'presence', field: 'test_access_mode_granted_date', message: 'Chưa nhập thông tin [test_access_mode_granted_date]'},
		{type: 'presence', field: 'test_access_mode_valid_startdate', message: 'Chưa nhập thông tin [test_access_mode_valid_startdate]'},
		{type: 'presence', field: 'test_access_mode_valid_starttime', message: 'Chưa nhập thông tin [test_access_mode_valid_starttime]'},
		{type: 'presence', field: 'test_access_mode_is_disabled', message: 'Chưa nhập thông tin [test_access_mode_is_disabled]'},
		{type: 'length', field: 'test_access_mode_desc', message: 'Thông tin [test_access_mode_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_access_mode,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});