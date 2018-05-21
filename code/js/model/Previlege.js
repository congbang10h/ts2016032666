//ID: ffbf78397d9a422092d768f3c3a87d69
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Previlege', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'previlege_id',   type: 'int', title: 'previlege_id'},
		{name: 'previlege_code', type: 'string', title: 'previlege_code'},
		{name: 'previlege_desc', type: 'string', title: 'previlege_desc'}
	],
	actionName: 'Previlege',
	validations: [
		{type: 'presence', field: 'previlege_code', message: 'Chưa nhập thông tin [previlege_code]'},
		{type: 'length', field: 'previlege_code', message: 'Thông tin [previlege_code] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'previlege_desc', message: 'Chưa nhập thông tin [previlege_desc]'},
		{type: 'length', field: 'previlege_desc', message: 'Thông tin [previlege_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Previlege,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});