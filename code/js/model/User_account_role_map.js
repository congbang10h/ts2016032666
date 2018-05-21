//ID: d6c94daeae47645d5493b2e68aa4193c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.User_account_role_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'id',           type: 'int', title: 'id'},
		{name: 'user_id',      type: 'int', title: 'user_id'},
		{name: 'account_id',   type: 'string', title: 'account_id'},
		{name: 'role_id',      type: 'int', title: 'role_id'},
		{name: 'granted_date', type: 'date', title: 'granted_date'}
	],
	actionName: 'User_account_role_map',
	validations: [
		{type: 'presence', field: 'user_id', message: 'Chưa nhập thông tin [user_id]'},
		{type: 'presence', field: 'account_id', message: 'Chưa nhập thông tin [account_id]'},
		{type: 'length', field: 'account_id', message: 'Thông tin [account_id] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'role_id', message: 'Chưa nhập thông tin [role_id]'}
	],
	proxy:{
		type: 'direct',
		api: User_account_role_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});