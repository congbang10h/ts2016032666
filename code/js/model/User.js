//ID: 3fb1a30b77c2e5a52afeee7d5cea38d4
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.User', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'user_id',         type: 'int', title: 'user_id'},
		{name: 'user_code',       type: 'string', title: 'user_code'},
		{name: 'user_first_name', type: 'string', title: 'user_first_name'},
		{name: 'user_last_name',  type: 'string', title: 'user_last_name'},
		{name: 'user_email',      type: 'string', title: 'user_email'},
		{name: 'user_mobile',     type: 'string', title: 'user_mobile'},
		{name: 'user_birthdate',  type: 'date', title: 'user_birthdate'},
		{name: 'user_address',    type: 'string', title: 'user_address'}
	],
	actionName: 'User',
	validations: [
		{type: 'length', field: 'user_code', message: 'Thông tin [user_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'user_first_name', message: 'Chưa nhập thông tin [user_first_name]'},
		{type: 'length', field: 'user_first_name', message: 'Thông tin [user_first_name] dài hơn 100 ký tự', max: 100},
		{type: 'length', field: 'user_last_name', message: 'Thông tin [user_last_name] dài hơn 100 ký tự', max: 100},
		{type: 'length', field: 'user_email', message: 'Thông tin [user_email] dài hơn 100 ký tự', max: 100},
		{type: 'email', field: 'user_email', message: '[user_email] không đúng dạng địa chỉ email (abc@xyz.com)'},
		{type: 'length', field: 'user_mobile', message: 'Thông tin [user_mobile] dài hơn 12 ký tự', max: 12},
		{type: 'length', field: 'user_address', message: 'Thông tin [user_address] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: User,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});