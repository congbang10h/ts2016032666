//ID: 9e60a3baf6ad4a48b1570d04f2ed1118
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Role', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'role_id',   type: 'int', title: 'role_id'},
		{name: 'role_code', type: 'string', title: 'role_code'},
		{name: 'role_desc', type: 'string', title: 'role_desc'}
	],
	actionName: 'Role',
	validations: [
		{type: 'presence', field: 'role_code', message: 'Chưa nhập thông tin [role_code]'},
		{type: 'length', field: 'role_code', message: 'Thông tin [role_code] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'role_desc', message: 'Chưa nhập thông tin [role_desc]'},
		{type: 'length', field: 'role_desc', message: 'Thông tin [role_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Role,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});