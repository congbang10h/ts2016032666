//ID: cbb79c11564ff501b755adf1b07c2086
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Co_so_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'csom_id',     type: 'int', title: 'csom_id'},
		{name: 'co_id',       type: 'int', title: 'co_id'},
		{name: 'so_id',       type: 'int', title: 'so_id'},
		{name: 'csom_code',   type: 'int', title: 'csom_code'},
		{name: 'csom_date',   type: 'date', title: 'csom_date'},
		{name: 'csom_isused', type: 'int', title: 'csom_isused'}
	],
	actionName: 'Co_so_map',
	validations: [
		{type: 'presence', field: 'csom_code', message: 'Chưa nhập thông tin [csom_code]'},
		{type: 'presence', field: 'csom_date', message: 'Chưa nhập thông tin [csom_date]'},
		{type: 'presence', field: 'csom_isused', message: 'Chưa nhập thông tin [csom_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Co_so_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});