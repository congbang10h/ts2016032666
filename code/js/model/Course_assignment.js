//ID: 8c66563d58a031a866d02497390cd7e1
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_assignment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_assign_id',   type: 'int', title: 'course_assign_id'},
		{name: 'user_id',            type: 'int', title: 'user_id'},
		{name: 'course_id',          type: 'int', title: 'course_id'},
		{name: 'course_assign_role', type: 'string', title: 'course_assign_role'}
	],
	actionName: 'Course_assignment',
	validations: [
		{type: 'presence', field: 'course_assign_role', message: 'Chưa nhập thông tin [course_assign_role]'},
		{type: 'length', field: 'course_assign_role', message: 'Thông tin [course_assign_role] dài hơn 10 ký tự', max: 10}
	],
	proxy:{
		type: 'direct',
		api: Course_assignment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});