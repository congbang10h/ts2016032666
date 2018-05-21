//ID: 74f3d0ea05706c1b3658e03ad3abe201
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Univ_mission', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'um_id',     type: 'int', title: 'um_id'},
		{name: 'univ_id',   type: 'int', title: 'univ_id'},
		{name: 'um_code',   type: 'string', title: 'um_code'},
		{name: 'um_date',   type: 'date', title: 'um_date'},
		{name: 'um_isused', type: 'int', title: 'um_isused'}
	],
	actionName: 'Univ_mission',
	validations: [
		{type: 'presence', field: 'um_code', message: 'Chưa nhập thông tin [um_code]'},
		{type: 'length', field: 'um_code', message: 'Thông tin [um_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'um_date', message: 'Chưa nhập thông tin [um_date]'},
		{type: 'presence', field: 'um_isused', message: 'Chưa nhập thông tin [um_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Univ_mission,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});