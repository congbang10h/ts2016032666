//ID: af8f4ce880ed84a8de77ff271a5f3580
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_comment_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_comment_relationship_id', type: 'int', title: 'course_comment_relationship_id'},
		{name: 'parent_course_comment_id',       type: 'int', title: 'parent_course_comment_id'},
		{name: 'child_course_comment_id',        type: 'int', title: 'child_course_comment_id'}
	],
	actionName: 'Course_comment_relationship',
	proxy:{
		type: 'direct',
		api: Course_comment_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});