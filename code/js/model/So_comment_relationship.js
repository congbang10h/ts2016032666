//ID: df0058faa5743a834a69d80bf0abc00c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.So_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'so_comment_relationship_id',   type: 'int', title: 'so_comment_relationship_id'},
		{name: 'parent_so_comment_id',         type: 'int', title: 'parent_so_comment_id'},
		{name: 'child_so_comment_id',          type: 'int', title: 'child_so_comment_id'},
		{name: 'so_comment_relationship_desc', type: 'string', title: 'so_comment_relationship_desc'}
	],
	actionName: 'So_comment_relationship',
	validations: [
		{type: 'length', field: 'so_comment_relationship_desc', message: 'Thông tin [so_comment_relationship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: So_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});