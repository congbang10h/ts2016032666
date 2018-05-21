//ID: a6840e47102770f356d4382485a9eebc
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_content_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_content_map', type: 'int', title: 'question_content_map'},
		{name: 'question_id',          type: 'int', title: 'question_id'},
		{name: 'course_content_id',    type: 'int', title: 'course_content_id'}
	],
	actionName: 'Question_content_map',
	proxy:{
		type: 'direct',
		api: Question_content_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});