//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.User_test_map', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'user_test_id',        type: 'int', title: 'user_test_id'},
		{name: 'test_id',             type: 'int', title: 'test_id'},
		{name: 'user_id',             type: 'int', title: 'user_id'},
		{name: 'user_test_startdate', type: 'date', title: 'user_test_startdate'},
		{name: 'user_test_starttime', type: 'datetime', title: 'user_test_starttime'},
		{name: 'user_test_enddate',   type: 'date', title: 'user_test_enddate'},
		{name: 'user_test_endtime',   type: 'datetime', title: 'user_test_endtime'},
		{name: 'user_test_visible',   type: 'int', title: 'user_test_visible'}
	],
	actionName: 'User_test_map',
	proxy:{
		type: 'direct',
		api: User_test_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});