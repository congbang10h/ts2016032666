//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Course_content_map', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'course_content_map_id',     type: 'int', title: 'course_content_map_id'},
		{name: 'content_id',                type: 'string', title: 'content_id'},
		{name: 'course_id',                 type: 'string', title: 'course_id'},
		{name: 'course_content_map_factor', type: 'int', title: 'course_content_map_factor'}
	],
	actionName: 'Course_content_map',
	validations: [
		{type: 'length', field: 'content_id', message: 'Thông tin [content_id] dài hơn 20 ký tự', max: 20},
		{type: 'length', field: 'course_id', message: 'Thông tin [course_id] dài hơn 10 ký tự', max: 10}
	],
	proxy:{
		type: 'direct',
		api: Course_content_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});