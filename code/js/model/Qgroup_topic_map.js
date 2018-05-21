//ID: 33c742250dde4e668b8818ec1ed407ba
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Qgroup_topic_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'qgroup_topic_map_id', type: 'int', title: 'qgroup_topic_map_id'},
		{name: 'question_group_id',   type: 'int', title: 'question_group_id'},
		{name: 'topic_id',            type: 'int', title: 'topic_id'}
	],
	actionName: 'Qgroup_topic_map',
	proxy:{
		type: 'direct',
		api: Qgroup_topic_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});