//ID: 2f8fb16d42a2bce00631d0c9d10e91a5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Cco_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'cco_id',   type: 'int', title: 'cco_id'},
		{name: 'cc_id',    type: 'int', title: 'cc_id'},
		{name: 'coi_id',   type: 'int', title: 'coi_id'},
		{name: 'cco_desc', type: 'string', title: 'cco_desc'}
	],
	actionName: 'Cco_map',
	validations: [
		{type: 'length', field: 'cco_desc', message: 'Thông tin [cco_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Cco_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});