//ID: 0a30c3bb70103911327279a8ea3ce1c2
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Univ_mission_item', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'umi_id',      type: 'int', title: 'umi_id'},
		{name: 'um_id',       type: 'int', title: 'um_id'},
		{name: 'umi_code',    type: 'string', title: 'umi_code'},
		{name: 'umi_desc_vn', type: 'string', title: 'umi_desc_vn'},
		{name: 'umi_desc_en', type: 'string', title: 'umi_desc_en'}
	],
	actionName: 'Univ_mission_item',
	validations: [
		{type: 'presence', field: 'umi_code', message: 'Chưa nhập thông tin [umi_code]'},
		{type: 'length', field: 'umi_code', message: 'Thông tin [umi_code] dài hơn 5 ký tự', max: 5},
		{type: 'presence', field: 'umi_desc_vn', message: 'Chưa nhập thông tin [umi_desc_vn]'},
		{type: 'length', field: 'umi_desc_vn', message: 'Thông tin [umi_desc_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'umi_desc_en', message: 'Chưa nhập thông tin [umi_desc_en]'},
		{type: 'length', field: 'umi_desc_en', message: 'Thông tin [umi_desc_en] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Univ_mission_item,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});