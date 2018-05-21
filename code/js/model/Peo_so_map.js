//ID: d17bb13e3ac7805e746620ef68352350
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo_so_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'psm_id',     type: 'int', title: 'psm_id'},
		{name: 'sov_id',     type: 'int', title: 'sov_id'},
		{name: 'peo_id',     type: 'int', title: 'peo_id'},
		{name: 'psm_code',   type: 'int', title: 'psm_code'},
		{name: 'psm_date',   type: 'date', title: 'psm_date'},
		{name: 'psm_isused', type: 'int', title: 'psm_isused'}
	],
	actionName: 'Peo_so_map',
	validations: [
		{type: 'presence', field: 'psm_code', message: 'Chưa nhập thông tin [psm_code]'},
		{type: 'presence', field: 'psm_isused', message: 'Chưa nhập thông tin [psm_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Peo_so_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});