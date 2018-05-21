//ID: d575e29dc303611aae53df11da49693e
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.User_course_devmap', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'user_course_devmap_id', type: 'int', title: 'user_course_devmap_id'},
		{name: 'user_id',               type: 'int', title: 'user_id'},
		{name: 'course_id',             type: 'int', title: 'course_id'}
	],
	actionName: 'User_course_devmap',
	proxy:{
		type: 'direct',
		api: User_course_devmap,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});