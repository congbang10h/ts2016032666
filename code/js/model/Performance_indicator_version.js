//ID: e3becec665fd50fb91c5ed2943527cd9
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Performance_indicator_version', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'performance_indicator_version_id',     type: 'int', title: 'performance_indicator_version_id'},
		{name: 'so_id',                                type: 'int', title: 'so_id'},
		{name: 'performance_indicator_version_code',   type: 'string', title: 'performance_indicator_version_code'},
		{name: 'performance_indicator_version_date',   type: 'date', title: 'performance_indicator_version_date'},
		{name: 'performance_indicator_version_isused', type: 'int', title: 'performance_indicator_version_isused'}
	],
	actionName: 'Performance_indicator_version',
	validations: [
		{type: 'presence', field: 'performance_indicator_version_code', message: 'Chưa nhập thông tin [performance_indicator_version_code]'},
		{type: 'length', field: 'performance_indicator_version_code', message: 'Thông tin [performance_indicator_version_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'performance_indicator_version_date', message: 'Chưa nhập thông tin [performance_indicator_version_date]'},
		{type: 'presence', field: 'performance_indicator_version_isused', message: 'Chưa nhập thông tin [performance_indicator_version_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Performance_indicator_version,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});