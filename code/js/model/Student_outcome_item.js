//ID: a6f8cc1e2e4251ff3c5cd343e6cdf530
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Student_outcome_item', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'soi_id',      type: 'int', title: 'soi_id'},
		{name: 'so_id',       type: 'int', title: 'so_id'},
		{name: 'soi_code',    type: 'string', title: 'soi_code'},
		{name: 'soi_desc_vn', type: 'string', title: 'soi_desc_vn'},
		{name: 'soi_desc_en', type: 'string', title: 'soi_desc_en'}
	],
	actionName: 'Student_outcome_item',
	validations: [
		{type: 'presence', field: 'soi_code', message: 'Chưa nhập thông tin [soi_code]'},
		{type: 'length', field: 'soi_code', message: 'Thông tin [soi_code] dài hơn 2 ký tự', max: 2},
		{type: 'presence', field: 'soi_desc_vn', message: 'Chưa nhập thông tin [soi_desc_vn]'},
		{type: 'length', field: 'soi_desc_vn', message: 'Thông tin [soi_desc_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'soi_desc_en', message: 'Chưa nhập thông tin [soi_desc_en]'},
		{type: 'length', field: 'soi_desc_en', message: 'Thông tin [soi_desc_en] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Student_outcome_item,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});