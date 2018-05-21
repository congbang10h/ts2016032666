//ID: 0b9778d68ae45480ff1667dc73503dfa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_relationship', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_relationship_id',      type: 'int', title: 'course_relationship_id'},
		{name: 'parent_course_id',            type: 'int', title: 'parent_course_id'},
		{name: 'child_course_id',             type: 'int', title: 'child_course_id'},
		{name: 'course_relationship_type_id', type: 'int', title: 'course_relationship_type_id'},
		{name: 'course_relationship_desc',    type: 'string', title: 'course_relationship_desc'}
	],
	actionName: 'Course_relationship',
	validations: [
		{type: 'length', field: 'course_relationship_desc', message: 'Thông tin [course_relationship_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_relationship,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});