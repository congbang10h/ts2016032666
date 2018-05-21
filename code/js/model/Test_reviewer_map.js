//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
Ext.define('VX.model.Test_reviewer_map', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_reviewer_map_id',         type: 'int', title: 'test_reviewer_map_id'},
		{name: 'user_id',                      type: 'int', title: 'user_id'},
		{name: 'use_user_id',                  type: 'int', title: 'use_user_id'},
		{name: 'test_reviewer_map_assigndate', type: 'date', title: 'test_reviewer_map_assigndate'},
		{name: 'test_reviewer_map_assigntime', type: 'datetime', title: 'test_reviewer_map_assigntime'},
		{name: 'test_reviewer_map_enddate',    type: 'date', title: 'test_reviewer_map_enddate'},
		{name: 'test_reviewer_map_end_time',   type: 'datetime', title: 'test_reviewer_map_end_time'},
		{name: 'test_reviewer_map_desc',       type: 'string', title: 'test_reviewer_map_desc'}
	],
	actionName: 'Test_reviewer_map',
	validations: [
		{type: 'presence', field: 'test_reviewer_map_assigndate', message: 'Chưa nhập thông tin [test_reviewer_map_assigndate]'},
		{type: 'presence', field: 'test_reviewer_map_assigntime', message: 'Chưa nhập thông tin [test_reviewer_map_assigntime]'},
		{type: 'presence', field: 'test_reviewer_map_enddate', message: 'Chưa nhập thông tin [test_reviewer_map_enddate]'},
		{type: 'presence', field: 'test_reviewer_map_end_time', message: 'Chưa nhập thông tin [test_reviewer_map_end_time]'},
		{type: 'length', field: 'test_reviewer_map_desc', message: 'Thông tin [test_reviewer_map_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_reviewer_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
});