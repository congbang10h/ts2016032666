//ID: e3135376e84336fcb5e6c8f3492f4901
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Coi_soi_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'csim_id',    type: 'int', title: 'csim_id'},
		{name: 'coi_id',     type: 'int', title: 'coi_id'},
		{name: 'csom_id',    type: 'int', title: 'csom_id'},
		{name: 'soi_id',     type: 'int', title: 'soi_id'},
		{name: 'csim_level', type: 'string', title: 'csim_level'}
	],
	actionName: 'Coi_soi_map',
	validations: [
		{type: 'presence', field: 'csim_level', message: 'Chưa nhập thông tin [csim_level]'},
		{type: 'length', field: 'csim_level', message: 'Thông tin [csim_level] dài hơn 1 ký tự', max: 1}
	],
	proxy:{
		type: 'direct',
		api: Coi_soi_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});