//ID: 72e4589a722be345e28fc9e55bb408be
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Taker_test_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'taker_test_map_id',        type: 'int', title: 'taker_test_map_id'},
		{name: 'test_id',                  type: 'int', title: 'test_id'},
		{name: 'user_id',                  type: 'int', title: 'user_id'},
		{name: 'taker_test_map_starttime', type: 'datetime', title: 'taker_test_map_starttime'},
		{name: 'taker_test_map_endtime',   type: 'datetime', title: 'taker_test_map_endtime'},
		{name: 'taker_test_map_desc',      type: 'string', title: 'taker_test_map_desc'}
	],
	actionName: 'Taker_test_map',
	validations: [
		{type: 'presence', field: 'taker_test_map_starttime', message: 'Chưa nhập thông tin [taker_test_map_starttime]'},
		{type: 'presence', field: 'taker_test_map_endtime', message: 'Chưa nhập thông tin [taker_test_map_endtime]'},
		{type: 'length', field: 'taker_test_map_desc', message: 'Thông tin [taker_test_map_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Taker_test_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});