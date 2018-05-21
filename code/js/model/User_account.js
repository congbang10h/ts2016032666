//ID: ea2a4b7e275df60a38fc1617d5bb23fa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.User_account', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'account_id',       type: 'string', title: 'account_id'},
		{name: 'user_id',          type: 'int', title: 'user_id'},
		{name: 'account_password', type: 'string', title: 'account_password'}
	],
	actionName: 'User_account',
	validations: [
		{type: 'presence', field: 'account_id', message: 'Chưa nhập thông tin [account_id]'},
		{type: 'length', field: 'account_id', message: 'Thông tin [account_id] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'user_id', message: 'Chưa nhập thông tin [user_id]'},
		{type: 'presence', field: 'account_password', message: 'Chưa nhập thông tin [account_password]'},
		{type: 'length', field: 'account_password', message: 'Thông tin [account_password] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: User_account,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});