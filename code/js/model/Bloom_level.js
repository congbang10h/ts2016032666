//ID: 20b50d6caf814808e8c5c4290bfa6267
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Bloom_level', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'bloom_level_id',   type: 'int', title: 'bloom_level_id'},
		{name: 'bloom_level_code', type: 'int', title: 'bloom_level_code'},
		{name: 'bloom_level_desc', type: 'string', title: 'bloom_level_desc'}
	],
	actionName: 'Bloom_level',
	validations: [
		{type: 'presence', field: 'bloom_level_code', message: 'Chưa nhập thông tin [bloom_level_code]'},
		{type: 'presence', field: 'bloom_level_desc', message: 'Chưa nhập thông tin [bloom_level_desc]'},
		{type: 'length', field: 'bloom_level_desc', message: 'Thông tin [bloom_level_desc] dài hơn 64 ký tự', max: 64}
	],
	proxy:{
		type: 'direct',
		api: Bloom_level,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});