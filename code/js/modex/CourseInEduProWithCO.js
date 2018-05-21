Ext.define('VX.modex.CourseInEduProWithCO', {
	extend: 'Ext.data.Model',
	fields: [
		//Field of Course
		{name: 'course_id',               type: 'int'},
		{name: 'course_code',             type: 'string'},
		{name: 'course_name_vn',          type: 'string'},
		{name: 'course_name_en',          type: 'string'},
		//Field of Program_course_map
		{name: 'edu_program_id',           type: 'int'},
		//Field of Course_outcome
		{name: 'co_id',           type: 'int'}
	],
	actionName: 'CourseInEduProWithCO',
	proxy:{
		type: 'direct',
		api: CourseInEduProWithCO,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
