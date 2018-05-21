//ID: 3faf3984383474afa380c98166d814fd
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Qgroup_content_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'qgroup_content_map_id', type: 'int', title: 'qgroup_content_map_id'},
		{name: 'question_group_id',     type: 'int', title: 'question_group_id'},
		{name: 'course_content_id',     type: 'int', title: 'course_content_id'}
	],
	actionName: 'Qgroup_content_map',
	proxy:{
		type: 'direct',
		api: Qgroup_content_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});