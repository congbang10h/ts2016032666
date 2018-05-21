//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Content', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'content_id',        type: 'string', title: 'content_id'},
		{name: 'parent_content_id', type: 'string', title: 'parent_content_id'},
		{name: 'content_name',      type: 'string', title: 'content_name'},
		{name: 'content_desc',      type: 'string', title: 'content_desc'},
		{name: 'content_order',     type: 'int', title: 'content_order'}
	],
	actionName: 'Content',
	validations: [
		{type: 'presence', field: 'content_id', message: 'Chưa nhập thông tin [content_id]'},
		{type: 'length', field: 'content_id', message: 'Thông tin [content_id] dài hơn 20 ký tự', max: 20},
		{type: 'length', field: 'parent_content_id', message: 'Thông tin [parent_content_id] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'content_name', message: 'Chưa nhập thông tin [content_name]'},
		{type: 'length', field: 'content_name', message: 'Thông tin [content_name] dài hơn 200 ký tự', max: 200},
		{type: 'length', field: 'content_desc', message: 'Thông tin [content_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Content,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});