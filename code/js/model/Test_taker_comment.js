//ID: 86fe497305c817cb41f5cacac2905d39
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Test_taker_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'test_taker_comment_id',   type: 'int', title: 'test_taker_comment_id'},
		{name: 'taker_test_map_id',       type: 'int', title: 'taker_test_map_id'},
		{name: 'test_taker_comment_date', type: 'date', title: 'test_taker_comment_date'},
		{name: 'test_taker_comment_time', type: 'datetime', title: 'test_taker_comment_time'},
		{name: 'test_taker_comment_desc', type: 'string', title: 'test_taker_comment_desc'}
	],
	actionName: 'Test_taker_comment',
	validations: [
		{type: 'presence', field: 'test_taker_comment_date', message: 'Chưa nhập thông tin [test_taker_comment_date]'},
		{type: 'presence', field: 'test_taker_comment_desc', message: 'Chưa nhập thông tin [test_taker_comment_desc]'},
		{type: 'length', field: 'test_taker_comment_desc', message: 'Thông tin [test_taker_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_taker_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});