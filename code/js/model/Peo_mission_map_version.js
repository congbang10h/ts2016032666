//ID: 09fd94a311144d4ebba5a3fa3f943c86
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo_mission_map_version', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'pmv_id',         type: 'int', title: 'pmv_id'},
		{name: 'peo_version_id', type: 'int', title: 'peo_version_id'},
		{name: 'umv_id',         type: 'int', title: 'umv_id'},
		{name: 'pmv_code',       type: 'int', title: 'pmv_code'},
		{name: 'pmv_date',       type: 'date', title: 'pmv_date'},
		{name: 'pmv_isused',     type: 'int', title: 'pmv_isused'}
	],
	actionName: 'Peo_mission_map_version',
	validations: [
		{type: 'presence', field: 'pmv_code', message: 'Chưa nhập thông tin [pmv_code]'},
		{type: 'presence', field: 'pmv_date', message: 'Chưa nhập thông tin [pmv_date]'},
		{type: 'presence', field: 'pmv_isused', message: 'Chưa nhập thông tin [pmv_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Peo_mission_map_version,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});