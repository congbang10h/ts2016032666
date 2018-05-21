//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Content_outcome_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'content_outcome_map_id',   type: 'int', title: 'content_outcome_map_id'},
		{name: 'course_content_id',        type: 'int', title: 'course_content_id'},
		{name: 'co_id',                    type: 'int', title: 'co_id'},
		{name: 'content_outcome_map_desc', type: 'string', title: 'content_outcome_map_desc'}
	],
	actionName: 'Content_outcome_map',
	validations: [
		{type: 'length', field: 'content_outcome_map_desc', message: 'Thông tin [content_outcome_map_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Content_outcome_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});