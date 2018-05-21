//ID: 5585bc5dc9fa65c8ec822da54b7060cb
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peo_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'peo_comment_relationship_id',   type: 'int', title: 'peo_comment_relationship_id'},
		{name: 'parent_peo_comment_id',         type: 'int', title: 'parent_peo_comment_id'},
		{name: 'child_peo_comment_id',          type: 'int', title: 'child_peo_comment_id'},
		{name: 'peo_comment_relationship_desc', type: 'string', title: 'peo_comment_relationship_desc'}
	],
	actionName: 'Peo_comment_relationship',
	validations: [
		{type: 'length', field: 'peo_comment_relationship_desc', message: 'Thông tin [peo_comment_relationship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Peo_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});