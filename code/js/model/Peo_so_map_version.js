//ID: b67d1e71ced3df6178517ab199c723b5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo_so_map_version', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'psv_id',         type: 'int', title: 'psv_id'},
		{name: 'sov_id',         type: 'int', title: 'sov_id'},
		{name: 'peo_version_id', type: 'int', title: 'peo_version_id'},
		{name: 'psv_code',       type: 'int', title: 'psv_code'},
		{name: 'psv_date',       type: 'date', title: 'psv_date'},
		{name: 'psv_isused',     type: 'int', title: 'psv_isused'}
	],
	actionName: 'Peo_so_map_version',
	validations: [
		{type: 'presence', field: 'psv_code', message: 'Chưa nhập thông tin [psv_code]'},
		{type: 'presence', field: 'psv_isused', message: 'Chưa nhập thông tin [psv_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Peo_so_map_version,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});