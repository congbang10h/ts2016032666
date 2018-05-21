//ID: 7f88d784c264552393999f7dcaa2b9ca
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo_item', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'peoi_id',      type: 'int', title: 'peoi_id'},
		{name: 'peo_id',       type: 'int', title: 'peo_id'},
		{name: 'peoi_code',    type: 'string', title: 'peoi_code'},
		{name: 'peoi_desc_vn', type: 'string', title: 'peoi_desc_vn'},
		{name: 'peoi_desc_en', type: 'string', title: 'peoi_desc_en'}
	],
	actionName: 'Peo_item',
	validations: [
		{type: 'presence', field: 'peoi_code', message: 'Chưa nhập thông tin [peoi_code]'},
		{type: 'length', field: 'peoi_code', message: 'Thông tin [peoi_code] dài hơn 5 ký tự', max: 5},
		{type: 'presence', field: 'peoi_desc_vn', message: 'Chưa nhập thông tin [peoi_desc_vn]'},
		{type: 'length', field: 'peoi_desc_vn', message: 'Thông tin [peoi_desc_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'peoi_desc_en', message: 'Chưa nhập thông tin [peoi_desc_en]'},
		{type: 'length', field: 'peoi_desc_en', message: 'Thông tin [peoi_desc_en] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Peo_item,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});