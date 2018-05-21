//ID: 6f3d171c5c7b84387ca4d0cc6022fb9a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Dept_course_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'dept_course_map_id',        type: 'int', title: 'dept_course_map_id'},
		{name: 'dept_id',                   type: 'int', title: 'dept_id'},
		{name: 'course_id',                 type: 'int', title: 'course_id'},
		{name: 'dept_course_map_startdate', type: 'date', title: 'dept_course_map_startdate'},
		{name: 'dept_course_map_enddate',   type: 'date', title: 'dept_course_map_enddate'}
	],
	actionName: 'Dept_course_map',
	validations: [
		{type: 'presence', field: 'dept_course_map_startdate', message: 'Chưa nhập thông tin [dept_course_map_startdate]'}
	],
	proxy:{
		type: 'direct',
		api: Dept_course_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});