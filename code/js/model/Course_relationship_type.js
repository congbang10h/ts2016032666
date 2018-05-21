//ID: 857f9b2c987484efea8d7d69a28b9216
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_relationship_type', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_relationship_type_id',   type: 'int', title: 'course_relationship_type_id'},
		{name: 'course_relationship_type_code', type: 'string', title: 'course_relationship_type_code'},
		{name: 'course_relationship_type_desc', type: 'string', title: 'course_relationship_type_desc'}
	],
	actionName: 'Course_relationship_type',
	validations: [
		{type: 'presence', field: 'course_relationship_type_code', message: 'Chưa nhập thông tin [course_relationship_type_code]'},
		{type: 'length', field: 'course_relationship_type_code', message: 'Thông tin [course_relationship_type_code] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'course_relationship_type_desc', message: 'Chưa nhập thông tin [course_relationship_type_desc]'},
		{type: 'length', field: 'course_relationship_type_desc', message: 'Thông tin [course_relationship_type_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_relationship_type,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});