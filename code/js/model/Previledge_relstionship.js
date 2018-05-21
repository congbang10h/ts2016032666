//ID: 82832e9d90299da7be853b4291b9b6aa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Previledge_relstionship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'previledge_relstionship_id',   type: 'int', title: 'previledge_relstionship_id'},
		{name: 'parent_previledge_id',         type: 'int', title: 'parent_previledge_id'},
		{name: 'child_previledge_id',          type: 'int', title: 'child_previledge_id'},
		{name: 'previledge_relstionship_desc', type: 'string', title: 'previledge_relstionship_desc'}
	],
	actionName: 'Previledge_relstionship',
	validations: [
		{type: 'presence', field: 'previledge_relstionship_desc', message: 'Chưa nhập thông tin [previledge_relstionship_desc]'},
		{type: 'length', field: 'previledge_relstionship_desc', message: 'Thông tin [previledge_relstionship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Previledge_relstionship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});