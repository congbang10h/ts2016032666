//ID: a4b9a94ff3cc852f3a4537a81bce14d7
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_access_mode', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_access_mode_id',              type: 'int', title: 'course_access_mode_id'},
		{name: 'course_id',                          type: 'int', title: 'course_id'},
		{name: 'accessor_id',                        type: 'int', title: 'accessor_id'},
		{name: 'role_id',                            type: 'int', title: 'role_id'},
		{name: 'grantor_id',                         type: 'int', title: 'grantor_id'},
		{name: 'previlege_id',                       type: 'int', title: 'previlege_id'},
		{name: 'course_access_mode_granted_date',    type: 'date', title: 'course_access_mode_granted_date'},
		{name: 'course_access_mode_valid_startdate', type: 'date', title: 'course_access_mode_valid_startdate'},
		{name: 'course_access_mode_valid_enddate',   type: 'date', title: 'course_access_mode_valid_enddate'},
		{name: 'course_access_mode_valid_starttime', type: 'datetime', title: 'course_access_mode_valid_starttime'},
		{name: 'course_access_mode_endtime',         type: 'datetime', title: 'course_access_mode_endtime'},
		{name: 'course_access_mode_is_disabled',     type: 'int', title: 'course_access_mode_is_disabled'},
		{name: 'course_access_mode_desc',            type: 'string', title: 'course_access_mode_desc'}
	],
	actionName: 'Course_access_mode',
	validations: [
		{type: 'presence', field: 'course_access_mode_granted_date', message: 'Chưa nhập thông tin [course_access_mode_granted_date]'},
		{type: 'presence', field: 'course_access_mode_valid_startdate', message: 'Chưa nhập thông tin [course_access_mode_valid_startdate]'},
		{type: 'presence', field: 'course_access_mode_valid_starttime', message: 'Chưa nhập thông tin [course_access_mode_valid_starttime]'},
		{type: 'presence', field: 'course_access_mode_is_disabled', message: 'Chưa nhập thông tin [course_access_mode_is_disabled]'},
		{type: 'length', field: 'course_access_mode_desc', message: 'Thông tin [course_access_mode_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_access_mode,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});