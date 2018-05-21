//ID: 07d8c3f52eda82e9edaedc9c681e51a6
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Test_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'test_comment_relationship_id',   type: 'int', title: 'test_comment_relationship_id'},
		{name: 'parent_test_comment_id',         type: 'int', title: 'parent_test_comment_id'},
		{name: 'child_test_comment_id',          type: 'int', title: 'child_test_comment_id'},
		{name: 'test_comment_relationship_desc', type: 'string', title: 'test_comment_relationship_desc'}
	],
	actionName: 'Test_comment_relationship',
	validations: [
		{type: 'length', field: 'test_comment_relationship_desc', message: 'Thông tin [test_comment_relationship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});