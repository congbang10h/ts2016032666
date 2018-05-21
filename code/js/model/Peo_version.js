//ID: 796d25e83567d61874fd7c7f3d26a45a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo_version', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'peo_version_id',     type: 'int', title: 'peo_version_id'},
		{name: 'edu_program_id',     type: 'int', title: 'edu_program_id'},
		{name: 'peo_version_code',   type: 'string', title: 'peo_version_code'},
		{name: 'peo_version_date',   type: 'date', title: 'peo_version_date'},
		{name: 'peo_version_isused', type: 'int', title: 'peo_version_isused'}
	],
	actionName: 'Peo_version',
	validations: [
		{type: 'presence', field: 'peo_version_code', message: 'Chưa nhập thông tin [peo_version_code]'},
		{type: 'length', field: 'peo_version_code', message: 'Thông tin [peo_version_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'peo_version_date', message: 'Chưa nhập thông tin [peo_version_date]'},
		{type: 'presence', field: 'peo_version_isused', message: 'Chưa nhập thông tin [peo_version_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Peo_version,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});