//ID: c1e35ea2fe255a276681b294717dd7ea
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course_reviewer_decision', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_reviewer_decision_id',   type: 'int', title: 'course_reviewer_decision_id'},
		{name: 'course_reviewer_decision_code', type: 'string', title: 'course_reviewer_decision_code'},
		{name: 'course_reviewer_decision_desc', type: 'string', title: 'course_reviewer_decision_desc'}
	],
	actionName: 'Course_reviewer_decision',
	validations: [
		{type: 'presence', field: 'course_reviewer_decision_code', message: 'Chưa nhập thông tin [course_reviewer_decision_code]'},
		{type: 'length', field: 'course_reviewer_decision_code', message: 'Thông tin [course_reviewer_decision_code] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'course_reviewer_decision_desc', message: 'Chưa nhập thông tin [course_reviewer_decision_desc]'},
		{type: 'length', field: 'course_reviewer_decision_desc', message: 'Thông tin [course_reviewer_decision_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Course_reviewer_decision,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});