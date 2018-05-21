//ID: 822e4a46b170e8d1a535a7bbb6d48b99
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Previlege_relstionship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'previlege_relstionship_id',   type: 'int', title: 'previlege_relstionship_id'},
		{name: 'parent_previlege_id',         type: 'int', title: 'parent_previlege_id'},
		{name: 'child_previlege_id',          type: 'int', title: 'child_previlege_id'},
		{name: 'previlege_relstionship_desc', type: 'string', title: 'previlege_relstionship_desc'}
	],
	actionName: 'Previlege_relstionship',
	validations: [
		{type: 'presence', field: 'previlege_relstionship_desc', message: 'Chưa nhập thông tin [previlege_relstionship_desc]'},
		{type: 'length', field: 'previlege_relstionship_desc', message: 'Thông tin [previlege_relstionship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Previlege_relstionship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});