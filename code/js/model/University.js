//ID: d82fe0a849e21dbf8b8ea585f086b749
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.University', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'univ_id',         type: 'int', title: 'univ_id'},
		{name: 'univ_code',       type: 'string', title: 'univ_code'},
		{name: 'univ_name_vn',    type: 'string', title: 'univ_name_vn'},
		{name: 'univ_name_en',    type: 'string', title: 'univ_name_en'},
		{name: 'univ_name_short', type: 'string', title: 'univ_name_short'}
	],
	actionName: 'University',
	validations: [
		{type: 'presence', field: 'univ_code', message: 'Chưa nhập thông tin [univ_code]'},
		{type: 'length', field: 'univ_code', message: 'Thông tin [univ_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'univ_name_vn', message: 'Chưa nhập thông tin [univ_name_vn]'},
		{type: 'length', field: 'univ_name_vn', message: 'Thông tin [univ_name_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'univ_name_en', message: 'Chưa nhập thông tin [univ_name_en]'},
		{type: 'length', field: 'univ_name_en', message: 'Thông tin [univ_name_en] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'univ_name_short', message: 'Chưa nhập thông tin [univ_name_short]'},
		{type: 'length', field: 'univ_name_short', message: 'Thông tin [univ_name_short] dài hơn 10 ký tự', max: 10}
	],
	proxy:{
		type: 'direct',
		api: University,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});