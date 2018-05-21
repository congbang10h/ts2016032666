//ID: 6b5f7a5e03229b981bef5345d9e84006
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Content_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'content_comment_relationship_id', type: 'int', title: 'content_comment_relationship_id'},
		{name: 'parent_content_comment_id',       type: 'int', title: 'parent_content_comment_id'},
		{name: 'child_content_comment_id',        type: 'int', title: 'child_content_comment_id'}
	],
	actionName: 'Content_comment_relationship',
	proxy:{
		type: 'direct',
		api: Content_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});