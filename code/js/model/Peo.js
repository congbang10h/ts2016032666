//ID: 7698882392e35f8fbd9512792dbeba36
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'peo_id',         type: 'int', title: 'peo_id'},
		{name: 'edu_program_id', type: 'int', title: 'edu_program_id'},
		{name: 'peo_code',       type: 'string', title: 'peo_code'},
		{name: 'peo_date',       type: 'date', title: 'peo_date'},
		{name: 'peo_isused',     type: 'int', title: 'peo_isused'}
	],
	actionName: 'Peo',
	validations: [
		{type: 'presence', field: 'peo_code', message: 'Chưa nhập thông tin [peo_code]'},
		{type: 'length', field: 'peo_code', message: 'Thông tin [peo_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'peo_date', message: 'Chưa nhập thông tin [peo_date]'},
		{type: 'presence', field: 'peo_isused', message: 'Chưa nhập thông tin [peo_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Peo,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});