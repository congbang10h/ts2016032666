Ext.define('VX.modex.CourseInEduPro', {
	extend: 'Ext.data.Model',
	fields: [
		//Field of Course
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
		{name: 'course_isused',           type: 'int', title: 'course_isused'},
		//Field of Program_course_map
		{name: 'pcm_id',                   type: 'int', title: 'pcm_id'},
		{name: 'edu_program_id',           type: 'int', title: 'edu_program_id'},
		{name: 'course_required_level_id', type: 'int', title: 'course_required_level_id'},
		{name: 'pcm_time_index',           type: 'int', title: 'semester'}
	],
	actionName: 'CourseInEduPro',
	proxy:{
		type: 'direct',
		api: CourseInEduPro,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
