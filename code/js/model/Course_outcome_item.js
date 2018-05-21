//ID: 2332944a6a2f232bfd301633f0e6d050
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_outcome_item', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'coi_id',      type: 'int', title: 'coi_id'},
		{name: 'co_id',       type: 'int', title: 'co_id'},
		{name: 'coi_code',    type: 'string', title: 'coi_code'},
		{name: 'coi_desc_vn', type: 'string', title: 'coi_desc_vn'},
		{name: 'coi_desc_en', type: 'string', title: 'coi_desc_en'}
	],
	actionName: 'Course_outcome_item',
	validations: [
		{type: 'presence', field: 'coi_code', message: 'Chưa nhập thông tin [coi_code]'},
		{type: 'length', field: 'coi_code', message: 'Thông tin [coi_code] dài hơn 5 ký tự', max: 5},
		{type: 'presence', field: 'coi_desc_vn', message: 'Chưa nhập thông tin [coi_desc_vn]'},
		{type: 'length', field: 'coi_desc_vn', message: 'Thông tin [coi_desc_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'coi_desc_en', message: 'Thông tin [coi_desc_en] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_outcome_item,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});