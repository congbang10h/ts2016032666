//ID: 60020d6db65cc641ce1eb88a802a3cab
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Course', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'course_id',               type: 'int', title: 'course_id'},
		{name: 'course_code',             type: 'string', title: 'course_code'},
		{name: 'course_name_vn',          type: 'string', title: 'course_name_vn'},
		{name: 'course_name_en',          type: 'string', title: 'course_name_en'},
		{name: 'course_name_short',       type: 'string', title: 'course_name_short'},
		{name: 'course_credits',          type: 'int', title: 'course_credits'},
		{name: 'course_linkto_syllabus',  type: 'string', title: 'course_linkto_syllabus'},
		{name: 'course_version_code',     type: 'string', title: 'course_version_code'},
		{name: 'course_introduced_date',  type: 'date', title: 'course_introduced_date'},
		{name: 'course_applied_year',     type: 'date', title: 'course_applied_year'},
		{name: 'course_applied_semester', type: 'int', title: 'course_applied_semester'},
		{name: 'course_isused',           type: 'int', title: 'course_isused'}
	],
	actionName: 'Course',
	validations: [
		{type: 'presence', field: 'course_code', message: 'Chưa nhập thông tin [course_code]'},
		{type: 'length', field: 'course_code', message: 'Thông tin [course_code] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'course_name_vn', message: 'Chưa nhập thông tin [course_name_vn]'},
		{type: 'length', field: 'course_name_vn', message: 'Thông tin [course_name_vn] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'course_name_en', message: 'Chưa nhập thông tin [course_name_en]'},
		{type: 'length', field: 'course_name_en', message: 'Thông tin [course_name_en] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'course_name_short', message: 'Thông tin [course_name_short] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'course_credits', message: 'Chưa nhập thông tin [course_credits]'},
		{type: 'length', field: 'course_linkto_syllabus', message: 'Thông tin [course_linkto_syllabus] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'course_version_code', message: 'Chưa nhập thông tin [course_version_code]'},
		{type: 'length', field: 'course_version_code', message: 'Thông tin [course_version_code] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'course_isused', message: 'Chưa nhập thông tin [course_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Course,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});