//ID: 21731f64b7efca4b62e0146bb0618784
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_topic_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_topic_map_id', type: 'int', title: 'course_topic_map_id'},
		{name: 'topic_id',            type: 'int', title: 'topic_id'},
		{name: 'course_id',           type: 'int', title: 'course_id'}
	],
	actionName: 'Course_topic_map',
	proxy:{
		type: 'direct',
		api: Course_topic_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});