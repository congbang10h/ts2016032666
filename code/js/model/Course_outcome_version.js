//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_outcome_version', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_outcome_version_id',     type: 'int', title: 'course_outcome_version_id'},
		{name: 'course_id',                     type: 'int', title: 'course_id'},
		{name: 'course_outcome_version_code',   type: 'string', title: 'course_outcome_version_code'},
		{name: 'course_outcome_version_date',   type: 'date', title: 'course_outcome_version_date'},
		{name: 'course_outcome_version_isused', type: 'int', title: 'course_outcome_version_isused'}
	],
	actionName: 'Course_outcome_version',
	validations: [
		{type: 'presence', field: 'course_outcome_version_code', message: 'Chưa nhập thông tin [course_outcome_version_code]'},
		{type: 'length', field: 'course_outcome_version_code', message: 'Thông tin [course_outcome_version_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'course_outcome_version_date', message: 'Chưa nhập thông tin [course_outcome_version_date]'},
		{type: 'presence', field: 'course_outcome_version_isused', message: 'Chưa nhập thông tin [course_outcome_version_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Course_outcome_version,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});